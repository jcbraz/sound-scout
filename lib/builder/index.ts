import { openaiInit } from "../open-ai";
import { BasicTrackInfo, Playlist } from "../types";
import sdk from '@/lib/spotify-sdk/ClientInstance';

interface SuggestionsBuilder {
    produceAISuggestions(): void;
    produceTitle(): Promise<void>;
    produceResults(): Promise<Playlist | null>
}

interface PlaylistBuilder {
    produceInfrastructure(): Promise<void>;
    produceTracks(): Promise<void>;
    produceAdditionalSuggestions(): Promise<void>;
    integrateTracks(): Promise<Playlist | null>;
}


class SpotifyPlaylist implements PlaylistBuilder {
    private id: string | null;
    private readonly description: string;
    private title: string | null;
    private aiSuggestion: BasicTrackInfo[] | null;
    private readonly desiredTrackSize: number;
    private currentTracks: string[] | null;
    private currentSuggestions: string[] | null;

    constructor(description: string, desiredTrackSize: number) {
        this.title = null;
        this.description = description;
        this.aiSuggestion = null;
        this.id = null;
        this.desiredTrackSize = desiredTrackSize;
        this.currentTracks = null;
        this.currentSuggestions = null;
    }

    protected getTitle(): string | null {
        return this.title;
    }

    protected setTitle(title: string): void {
        this.title = title;
    }

    private getId(): string | null {
        return this.id;
    }

    private setId(id: string): void {
        this.id = id;
    }

    private getCurrentTracks(): string[] | null {
        return structuredClone(this.currentTracks);
    }

    private setCurrentTracks(tracks: string[]): void {
        this.currentTracks = tracks;
    }

    private setCurrentSuggestions(suggestions: string[]): void {
        this.currentSuggestions = suggestions;
    }

    protected getAiSuggestion(): BasicTrackInfo[] | null {
        return structuredClone(this.aiSuggestion);
    }

    protected setAiSuggestion(suggestions: BasicTrackInfo[]): void {
        this.aiSuggestion = suggestions;
    }

    async produceInfrastructure(): Promise<void> {
        try {
            if (!process.env.SPOTIFY_USER_ID) throw new Error('Missing SPOTIFY_USER_ID');
            const title = this.getTitle();
            if (!title) throw new Error('Missing playlist title');

            const playlist = await sdk.playlists.createPlaylist(process.env.SPOTIFY_USER_ID, {
                name: title,
                public: false,
                collaborative: true,
                description: this.description
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

    async produceTracks(): Promise<void> {
        try {
            const aiSuggestion = this.getAiSuggestion();
            if (!aiSuggestion || aiSuggestion.length === 0) throw new Error('Missing track list');
            const trackIds = await Promise.all(aiSuggestion.map(track => this.produceTrackURI(track)));
            const filteredTrackIds = trackIds.filter(id => id !== null).filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            }) as string[];
            this.setCurrentTracks(filteredTrackIds);
        } catch (error) {
            console.error('Error getting tracks ids', error);
        }
    }

    async produceAdditionalSuggestions(): Promise<void> {
        try {
            const id = this.getId();
            if (!id) throw new Error('Missing playlist id');

            const currentTracksIds = this.getCurrentTracks();
            if (!currentTracksIds || currentTracksIds.length === 0) throw new Error('Missing current tracks ids');

            if (currentTracksIds.length < this.desiredTrackSize) {

                const newSuggestionsIds = await sdk.recommendations.get({
                    seed_tracks: currentTracksIds.map(elem => elem?.replace('spotify:track:', "")).slice(0, 5)
                });

                if (!newSuggestionsIds) throw new Error('Error generating new tracks with reinforcing the playlist results');

                this.setCurrentSuggestions(newSuggestionsIds.tracks.map(track => 'spotify:track:' + track.id));
            }
        } catch (error) {
            console.error('Error getting suggestions', error);
        }
    }

    async integrateTracks(): Promise<Playlist | null> {
        try {
            const currentTracks = this.currentTracks;
            if (!currentTracks) throw new Error('Missing current tracks');
            const currentSuggestions = this.currentSuggestions;
            if (!currentSuggestions) throw new Error('Missing current suggestions');
            const currentId = this.getId();
            if (!currentId) throw new Error('Missing playlist id');

            try {
                await sdk.playlists.addItemsToPlaylist(currentId, currentTracks);
            } catch (error) {
                throw new Error('Error adding tracks to the playlist');
            }
            try {
                await sdk.playlists.addItemsToPlaylist(currentId, currentSuggestions);
                return {
                    id: currentId,
                    url: `https://open.spotify.com/playlist/${currentId}`,
                } as Playlist;
            } catch (error) {
                throw new Error('Error adding suggestions to the playlist');
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}


export class OpenAIPlaylistBuilder extends SpotifyPlaylist implements SuggestionsBuilder {

    private readonly userPrompt: string;
    private readonly aiReturnedContent: string;

    constructor(description: string, desiredTrackSize: number, userPrompt: string, aiReturnedContent: string) {
        super(description, desiredTrackSize);
        this.userPrompt = userPrompt;
        this.aiReturnedContent = aiReturnedContent;
    }

    produceAISuggestions(): void {
        const trackList: BasicTrackInfo[] = [];
        const pattern = /\s?\d+\.\s(.+)\s-\s(.+)/;
        const artist_delimiter_pattern = /ft\.|,|\(\s?feat/;

        for (const line of this.aiReturnedContent.split("\n")) {
            const match = pattern.exec(line);
            if (match) {
                const track_name = match[1];
                const track_artist = match[2].split(artist_delimiter_pattern)[0];
                trackList.push({ track_name, track_artist });
            }
        }

        super.setAiSuggestion(trackList);
    }

    async produceTitle(): Promise<void> {
        const openai = await openaiInit();
        const chat_completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `Imagine you are a marketing expert in the music industry. Based on the following list of songs, return a title for a playlist that would be appealing to the target audience. The output should be nothing more than the title. The list of songs: \n\n${this.userPrompt}`
                }
            ],
            max_tokens: 40
        });

        const title = chat_completion.choices.at(0)?.message.content;
        if (!title || title === undefined) console.error('Error from OpenAI generating title');
        else super.setTitle(title.replace(/['"]+/g, ''));
    }


    async produceResults(): Promise<Playlist | null> {
        try {
            await this.produceAISuggestions();
            await this.produceTitle();
            await super.produceInfrastructure();
            await super.produceTracks();
            await super.produceAdditionalSuggestions();
            return await super.integrateTracks();
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}