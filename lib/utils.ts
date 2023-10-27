import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const promptExamples = [
  "Playlist for a trip to Italy",
  "Sunset party playlist",
  "Drake's best songs to chill"
] as const;
