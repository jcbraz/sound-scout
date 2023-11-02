import { redirect } from "next/navigation";
import { Section } from "@/components/ui/section";
import Headers from "@/components/ui/headers";
import PromptInput from "@/components/actions/prompt-input";
import SuggestionCards from "@/components/actions/suggestion-cards";
import AuthenticatedDropdownMenu from "@/components/ui/authenticated-dropdown-menu";
import { getServerSession } from "next-auth";
import { checkUserRegister } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export default async function Home() {
  const session = await getServerSession();
  if (!session) redirect("/auth/signin");

  const userDB = await checkUserRegister(session);
  if (!userDB) {
    toast({
      title: "Something went wrong",
      description: "Please try to login again",
    });
    setTimeout(() => {
      redirect("/auth/signin");
    }, 3000);
  }

  return (
    <Section className="flex flex-col items-center space-y-12">
      <AuthenticatedDropdownMenu session={session} />
      <Headers />
      <PromptInput userId={userDB as number} />
      <SuggestionCards userId={userDB as number}/>
      {/* <SpotifySearch sdk={sdk} /> */}
    </Section>
  );
}

// function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
//   const [results, setResults] = useState<SearchResults>({} as SearchResults);

//   useEffect(() => {
//     (async () => {
//       const results = await sdk.search("More Love", ["track"]);
//       setResults(() => results);
//       const actualResult = results.tracks.items.filter(
//         (item): item is SpotifyApi.Track =>
//           item.type === "track" &&
//           "artists" in item &&
//           item.artists[0].name === "Moderat"
//       );
//       console.log(actualResult);
//       const playlist: Track = (
//         await sdk.playlists.getPlaylistItems("37i9dQZF1DX0SM0LYsmbMT")
//       ).items[0].track.artists[0].name;
//       console.log(playlist);
//     })();
//   }, [sdk]);

//   // generate a table for the results
//   const tableRows = results.artists?.items.map((artist) => {
//     return (
//       <tr key={artist.id}>
//         <td>{artist.name}</td>
//         <td>{artist.popularity}</td>
//         <td>{artist.followers.total}</td>
//       </tr>
//     );
//   });

//   return (
//     <>
//       <h1>Spotify Search for The Beatles</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Popularity</th>
//             <th>Followers</th>
//           </tr>
//         </thead>
//         <tbody>{tableRows}</tbody>
//       </table>
//     </>
//   );
// }
