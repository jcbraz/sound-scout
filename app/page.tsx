"use client";

import { type SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk";
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
      <AuthenticatedDropdownMenu
        name={session.data.user?.name ? session.data.user.name : ""}
        email={session.data.user?.email ? session.data.user.email : ""}
      />
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
      const results = await sdk.search("The Beatles", ["artist"]);
      setResults(() => results);
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
