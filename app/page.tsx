"use client";

import type { SearchResults, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Section } from "@/components/ui/section";
import Headers from "@/components/ui/headers";
import PromptInput from "@/components/actions/prompt-input";
import SuggestionCards from "@/components/actions/suggestion-cards";
import AuthenticatedDropdownMenu from "@/components/ui/authenticated-dropdown-menu";

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") redirect("/auth/signin");

  return (
    <Section className="flex flex-col items-center space-y-28">
      <AuthenticatedDropdownMenu session={session.data} />
      <Headers />
      <PromptInput />
      <SuggestionCards />
      <SpotifySearch sdk={sdk} />
    </Section>
  );
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const [results, setResults] = useState<SearchResults>({} as SearchResults);

  useEffect(() => {
    (async () => {
      const results = await sdk.search("More Love", ["track"]);
      setResults(() => results);
      const actualResult = results.tracks.items.filter(
        (item): item is SpotifyApi.Track =>
          item.type === "track" &&
          "artists" in item &&
          item.artists[0].name === "Moderat"
      );
      console.log(actualResult);
      const playlist: Track = (
        await sdk.playlists.getPlaylistItems("37i9dQZF1DX0SM0LYsmbMT")
      ).items[0].track.artists[0].name;
      console.log(playlist);
    })();
  }, [sdk]);

  // generate a table for the results
  const tableRows = results.artists?.items.map((artist) => {
    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers.total}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Spotify Search for The Beatles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}
