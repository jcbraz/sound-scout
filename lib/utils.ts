import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BasicTrackInfo } from "./types";
import type { Episode, Track } from "@spotify/web-api-ts-sdk";
import { addUser, getUserByEmail } from "@/db/queries";
import { Session } from "next-auth";
import { openai } from "./open-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const promptExamples = [
  "Playlist for a trip to Italy",
  "Sunset party playlist",
  "Drake's best songs to chill"
] as const;

export function checkTrackType(track: Track | Episode): track is Track {
  return track as Track !== undefined && (track as Track).type === "track";
}

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

export async function generateNewSuggestionsForReinforcement(prompt: string, previousFilteredTracks: BasicTrackInfo[]): Promise<string | null> {

  const jointTracks = previousFilteredTracks.map(track => `${track['track_name']} - ${track['track_artist']}`).join(", ");
  const chat_completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Imagine you are a creative dj. Someone asked you to make a playlist with 15 songs with the following requirements: ${prompt}. The restrictions for tracks for the tracks outputted are the following: all of the tracks should be available on Spotify. If any of the of track is not available on Spotify, it should not be outputted; Avoid outputting any other text than the actual track sequence; The output should contain nothing more than the sequence of labelled tracks with its name and the artist; For the name of the song, write only the tittle without any other information such as secondary artist (feat section). For the artist, write only the main artist and no other artist involved; The format should respect the following format:
        1. (Track name) - (Track artist)
        2. (Track name) - (Track artist)
        ....
        
        The output songs should be different than the following songs:
        ${jointTracks}
        `,
      }],
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
  })

  const result = chat_completion.choices.at(0)?.message.content;
  if (result === undefined) return null;
  else return result;
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