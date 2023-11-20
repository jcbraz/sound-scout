import { openaiInit } from '@/lib/open-ai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const { prompt } = await req.json();
    const openai = await openaiInit();

    // Request the OpenAI API for the response based on the prompt
    const chat_completion = await openai.chat.completions.create({
        messages: [{
            role: 'user',
            content: `Imagine you're a creative dj. Someone asked you to make a playlist with 15 to 20 songs with the following requirements: ${prompt}. The restrictions for tracks for the tracks outputted are the following: all of the tracks should be available on Spotify. If any of the of track is not available on Spotify, it should not be outputted; Avoid outputting any other text than the actual track sequence; The output should contain nothing more than the sequence of labelled tracks with its name and the artist; For the name of the song, write only the tittle without any other information such as secondary artist (feat section). For the artist, write only the main artist and no other artist involved; The format should respect the following format:
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
        stream: true
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(chat_completion)

    // Respond with the stream
    return new StreamingTextResponse(stream)
}
