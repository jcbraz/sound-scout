import AuthenticatedDropdownMenu from "@/components/ui/authenticated-dropdown-menu";
import { Section } from "@/components/ui/section";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PromptShowcase from "./components/prompt-showcase";
import ResultsShowcase from "./components/results-showcase";
import { addPlaylist, checkIfPlaylistExists, getUserCredits } from "@/db/queries";

type SearchParamsType = {
  prompt: string;
  userId: number;
};

const GeneratePage = async ({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/auth/signin");

  const { prompt, userId } = searchParams;

  if (prompt === "" || !prompt || !userId) redirect("/");

  const databaseFlag = await checkIfPlaylistExists(prompt, userId);
  let databaseResponse: number | null = null;

  if (!databaseFlag) {
    databaseResponse = await addPlaylist({
      prompt: prompt,
      user_id: userId,
    });

    if (!databaseResponse) redirect("/");
  }

  const credits = await getUserCredits(userId);

  return (
    <Section className="flex flex-col items-center lg:h-full">
      <AuthenticatedDropdownMenu session={session} />
      <PromptShowcase prompt={prompt} />
      <ResultsShowcase
        playlist_id={databaseResponse as number}
        user_credits={credits}
        user_id={userId}
        user_prompt={prompt}
      />
    </Section>
  );
};

export default GeneratePage;
