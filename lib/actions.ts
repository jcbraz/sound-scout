'use server';

import { Playlist, BasicTrackInfo } from "./types";
import { checkTrackType, filterTracks, generateCustomTitle, generateNewSuggestionsForReinforcement, openai } from "./utils";
import sdk from '@/lib/spotify-sdk/ClientInstance';

export async function generateTrackSuggestionsAsText(user_prompt: string) {
    const chat_completion = await openai.chat.completions.create({
        messages: [{
            role: 'user',
            content: `Imagine you're a creative dj. Someone asked you to make a playlist with 15 to 20 songs with the following requirements: ${user_prompt}. The restrictions for tracks for the tracks outputted are the following: all of the tracks should be available on Spotify. If any of the of track is not available on Spotify, it should not be outputted; Avoid outputting any other text than the actual track sequence; The output should contain nothing more than the sequence of labelled tracks with its name and the artist; For the name of the song, write only the tittle without any other information such as secondary artist (feat section). For the artist, write only the main artist and no other artist involved; The format should respect the following format:
        1. (Track name) - (Track artist)
        2. (Track name) - (Track artist)
        ....`,
        }],
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
        stream: false
    });

    const response = chat_completion.choices.at(0)?.message.content;
    if (response === undefined) return null;
    else return response;
}

async function getTrackURI(track: BasicTrackInfo) {
    const potentialTracks = await sdk.search(track.track_name, ['track'])
    const actualTrack = potentialTracks.tracks.items.filter(item => item.artists.at(0)?.name === track.track_artist);

    if (actualTrack.length === 0) return null;
    else return actualTrack.at(0)?.uri;
}

async function getTracksURI(trackList: BasicTrackInfo[]) {
    try {
        const trackIds = await Promise.all(trackList.map(track => getTrackURI(track)));
        return trackIds.filter(id => id !== null) as string[];
    } catch (error) {
        console.error('Error getting tracks ids', error);
    }
}

async function createPlaylist(title: string, prompt: string) {
    try {
        if (!process.env.SPOTIFY_USER_ID) throw new Error('Missing SPOTIFY_USER_ID');

        const playlist = await sdk.playlists.createPlaylist(process.env.SPOTIFY_USER_ID, {
            name: title,
            public: false,
            collaborative: true,
            description: prompt
        });

        return {
            id: playlist.id,
            url: playlist.external_urls.spotify
        } as Playlist;
    } catch (error) {
        console.error('Error creating playlist', error);
    }
}

async function addTracksToPlaylist(tracksURI: string[], playlistId: string) {
    try {
        await sdk.playlists.addItemsToPlaylist(playlistId, tracksURI);
    } catch (error) {
        console.error('Error adding items to the playlist', error);
    }
}

async function reinforcePlaylistResults(desiredTrackNumber: number, prompt: string, playlist: Playlist) {
    try {
        const playlistTracks = await sdk.playlists.getPlaylistItems(playlist.id);

        if (playlistTracks.items.length < desiredTrackNumber) {

            let previousTracksInfo: BasicTrackInfo[] = [];

            playlistTracks.items.map(item => {
                if (checkTrackType(item.track)) {
                    previousTracksInfo.push({
                        track_name: item.track.name,
                        track_artist: item.track.artists.at(0)?.name
                    } as BasicTrackInfo);
                }
            });

            const newTracks = await generateNewSuggestionsForReinforcement(prompt, previousTracksInfo);

            if (!newTracks) throw new Error('Error generating new tracks with reinforcing the playlist results');

            try {
                const newTracksInfo = filterTracks(newTracks);
                const newTracksURI = await getTracksURI(newTracksInfo);
                if (newTracksURI === undefined || newTracksURI.length == 0) throw new Error('Error getting tracks ids from the new tracks when reinforcing the playlist results');
                await addTracksToPlaylist(newTracksURI, playlist.id);
            } catch (error) {
                console.error(error);
            }
        }
    } catch (error) {
        console.error('Error reinforcing playlist results', error);
    }
}

export async function generatePlaylist(ai_response: string, user_prompt: string) {
    try {
        const playlist_title = (await generateCustomTitle(ai_response))?.replace('"', "") || 'Playlist';
        const filteredTracks = filterTracks(ai_response);

        const new_playlist = await createPlaylist(playlist_title, user_prompt);
        if (!new_playlist) {
            throw new Error('Error creating playlist');
        }

        const tracksURI = await getTracksURI(filteredTracks);
        if (!tracksURI || tracksURI.length == 0) {
            throw new Error('Error getting tracks ids from the filtered tracks');
        }

        await addTracksToPlaylist(tracksURI, new_playlist.id);
        await reinforcePlaylistResults(filteredTracks.length, user_prompt, new_playlist);

        return new_playlist;
    } catch (error) {
        console.error(error);
        throw error;
    }
}