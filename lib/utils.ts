import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BasicTrackInfo } from "./types";
import type { Episode, Track } from "@spotify/web-api-ts-sdk";
import { addUser, getUserByEmail } from "@/db/queries";
import { Session } from "next-auth";
import { openaiInit } from "./open-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const promptExamples = [
  "Playlist for a trip to Italy",
  "Sunset party playlist",
  "Drake's best songs to chill"
] as const;


// Auxiliary functions for playlist generation
export function filterTracks(ai_response: string): BasicTrackInfo[] {
  let trackList: BasicTrackInfo[] = [];
  let pattern = /\s?\d+\.\s(.+)\s-\s(.+)/;
  let artist_delimiter_pattern = /ft\.|,|\(\s?feat/;

  for (let line of ai_response.split("\n")) {
    const match = line.match(pattern);
    if (match) {
      let track_name = match[1];
      let track_artist = match[2].split(artist_delimiter_pattern)[0];
      trackList.push({ track_name, track_artist });
    }
  }

  return trackList;
}

export async function generateCustomTitle(ai_response: string) {
  const openai = await openaiInit();
  const chat_completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Imagine you are a marketing expert in the music industry. Based on the following list of songs, return a title for a playlist that would be appealing to the target audience. The output should be nothing more than the title. The list of songs: \n\n${ai_response}`
      }
    ],
    max_tokens: 40
  });

  return chat_completion.choices.at(0)?.message.content;
}


export async function checkUserRegister(session: Session) {
  if (!session.user?.email) return null;
  const user = await getUserByEmail(session.user.email);
  if (!user) {
    try {
      const new_user = await addUser({
        email: session.user.email,
        first_name: session.user.name?.split(" ")[0],
        last_name: session.user.name?.split(" ")[1],
      });
      if (!new_user) throw new Error("Error adding user");
      return new_user;
    } catch (error) {
      console.error("Error adding user: ", error);
      return null;
    }
  } else return user.at(0)?.id;
}