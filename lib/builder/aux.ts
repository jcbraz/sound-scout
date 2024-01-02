import { openaiInit } from "../open-ai";
import { BasicTrackInfo, Playlist } from "../types";
import sdk from '@/lib/spotify-sdk/ClientInstance';

interface PlaylistBuilder {
    produceAISuggestions(): Promise<string | null>;
    produceInfrastructure(): Promise<void>;
    produceTracks(): Promise<string[] | null>;
}

class OpenAIPlaylistBuilder implements PlaylistBuilder {

    private title: string;
    private userPrompt: string;
    private trackList: BasicTrackInfo[];
    private id: string | null;

    constructor(title: string, userPrompt: string, trackList: BasicTrackInfo[]) {
        this.userPrompt = userPrompt;
        this.title = title;
        this.trackList = structuredClone(trackList);
        this.id = null;
    }

    private getId(): string | null {
        return this.id;
    }

    private setId(id: string): void {
        this.id = id;
    }

    async produceAISuggestions(): Promise<string | null> {
        const openai = await openaiInit();
        const chat_completion = await openai.chat.completions.create({
            messages: [{
                role: 'user',
                content: `Imagine you're a creative dj. Someone asked you to make a playlist with 15 to 20 songs with the following requirements: ${this.userPrompt}. The restrictions for tracks for the tracks outputted are the following: all of the tracks should be available on Spotify. If any of the of track is not available on Spotify, it should not be outputted; Avoid outputting any other text than the actual track sequence; The output should contain nothing more than the sequence of labelled tracks with its name and the artist; For the name of the song, write only the tittle without any other information such as secondary artist (feat section). For the artist, write only the main artist and no other artist involved; The format should respect the following format:
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

    async produceInfrastructure(): Promise<void> {
        try {
            if (!process.env.SPOTIFY_USER_ID) throw new Error('Missing SPOTIFY_USER_ID');

            const playlist = await sdk.playlists.createPlaylist(process.env.SPOTIFY_USER_ID, {
                name: this.title,
                public: false,
                collaborative: true,
                description: this.userPrompt
            });

            this.setId(playlist.id);

        } catch (error) {
            console.error('Error creating playlist', error);
        }
    }

    private async produceTrackURI(track: BasicTrackInfo): Promise<string | null | undefined> {
        const potentialTracks = await sdk.search(track.track_name, ['track'])
        const actualTrack = potentialTracks.tracks.items.filter(item => item.artists.at(0)?.name === track.track_artist);

        if (actualTrack.length === 0) return null;
        else return actualTrack.at(0)?.uri;
    }

    private async produceTracksURI(trackList: BasicTrackInfo[]) {
        try {
            const trackIds = await Promise.all(trackList.map(track => this.produceTrackURI(track)));
            return trackIds.filter(id => id !== null) as string[];
        } catch (error) {
            console.error('Error getting tracks ids', error);
        }
    }

    private async checkForDuplicates(tracks: string[], playlistId: string) {
        try {
            const playlistTracks = await sdk.playlists.getPlaylistItems(playlistId);
            const playlistTracksIds = playlistTracks.items.map(item => item.track.id);

            return tracks.filter(track => !playlistTracksIds.includes(track));
        } catch (error) {
            console.error('Error checking playlist duplicates', error);
        }
    }

    async produceTracks(): Promise<string[] | null> {
        try {
            const id = this.getId();
            if (!id) throw new Error('Missing playlist id');

            const tracksURI = await this.produceTracksURI(this.trackList);
            if (!tracksURI) throw new Error('Missing tracks URI');

            const filteredTracks = await this.checkForDuplicates(tracksURI, id);
            if (!filteredTracks) throw new Error('Missing filtered tracks');

            if (filteredTracks.length === 0) return null;

            return filteredTracks;

        } catch (error) {
            console.error(error);
            return null;
        }
    }


}

class SpotifyPlaylist {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    public getID(): string {
        return this.id;
    }
}


class PlaylistDirector {
    private builder: PlaylistBuilder;

    public setBuilder(builder: PlaylistBuilder): void {
        this.builder = builder;
    }

    public async buildPlaylist(): Promise<Playlist | undefined | null> {
        const playlist = await this.builder.producePlaylist();
        return playlist;
    }
}