import { Section } from "@/components/ui/section";
import { getUserByEmail, getUserPlaylists } from "@/db/queries";
import HistoryTable from "./components/history-table";
import { toast } from "@/components/ui/use-toast";
import { SelectPlaylist } from "@/db/schema";
import MainPageLink from "@/components/ui/main-page-link";

type SearchParamsType = {
  email: string;
};

const HistoryPage = async ({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) => {
  const { email } = searchParams;
  let playlists: SelectPlaylist[] | null = null;

  try {
    const user = await getUserByEmail(email);
    if (!user) throw new Error("User with specific email not found");
    playlists = await getUserPlaylists(user[0].id);
    if (!playlists) throw new Error("User with specific email not found");
  } catch (error) {
    toast({
      title: "Error",
      description:
        "We are experience some error loading your playlist history. Please try again later.",
    });
  }

  return (
    <Section className="space-y-10">
      <MainPageLink />
      <h1 className="lg:text-4xl text-xl font-bold">Your Playlist History</h1>
      <HistoryTable playlists={playlists} />
    </Section>
  );
};

export default HistoryPage;
