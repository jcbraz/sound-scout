'use server';

import { OpenAIPlaylistBuilder } from "./builder";
import { Playlist } from "./types";

export async function invockeOpenAIPlaylistBuilder(description: string, desiredTrackSize: number, userPrompt: string, aiReturnedContent: string): Promise<Playlist | null> {
    try {
        const playlistBuilder = new OpenAIPlaylistBuilder(description, desiredTrackSize, userPrompt, aiReturnedContent);
        return await playlistBuilder.produceResults();
    } catch (error) {
        console.error(error);
        return null;
    }
}