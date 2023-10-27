"use client";

import { type SearchResults, SpotifyApi } from "@spotify/web-api-ts-sdk";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();

  if (!session || session.status !== "authenticated") redirect("/auth/signin");

  return (
    <div>
      <p>Logged in as {session.data.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
      <SpotifySearch sdk={sdk} />
    </div>
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