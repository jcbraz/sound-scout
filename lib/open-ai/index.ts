'use server';

import OpenAI from 'openai';

export const openaiInit = async () => {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_KEY,
    });
    return openai;
}