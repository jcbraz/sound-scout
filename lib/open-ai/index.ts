'use server';

import OpenAI from 'openai';

export const openaiInit = () => {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_KEY,
    });
    return openai;
}