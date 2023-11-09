import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import "dotenv/config";

if (!process.env.SPOTIFY_CLIENT_ID)
  throw new Error("Missing SPOTIFY_CLIENT_ID");

if (!process.env.SPOTIFY_CLIENT_SECRET)
  throw new Error("Missing SPOTIFY_CLIENT_SECRET");

const spotifyProfile = SpotifyProvider({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const authURL = new URL("https://accounts.spotify.com/authorize");

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-library-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public"
];

authURL.searchParams.append("scope", scopes.join(" "));

spotifyProfile.authorization = authURL.toString();

export default spotifyProfile;

export async function refreshAccessToken(token: JWT) {
  try {

    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
      cache: "no-cache",
    });

    const refreshedTokens = await response.json();

    if (!response.ok)
      throw refreshedTokens;

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: (Date.now() / 1000) + refreshedTokens.expires_in,
      expires_in: refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}