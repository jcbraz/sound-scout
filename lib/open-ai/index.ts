import { OpenAI } from 'openai';
import 'dotenv/config';

export const runtime = 'edge';

export const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })