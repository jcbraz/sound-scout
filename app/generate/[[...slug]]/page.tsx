import AuthenticatedDropdownMenu from "@/components/ui/authenticated-dropdown-menu";
import { Section } from "@/components/ui/section";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PromptShowcase from "./components/prompt-showcase";
import ResultsShowcase from "./components/results-showcase";
import { getUserCredits } from "@/db/queries";
import { Suspense } from "react";
import { Icons } from "@/components/ui/icons";

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

  const credits = await getUserCredits(userId);
  if (credits === undefined) redirect("/");
  if (credits === 0) redirect("/early-access");

  return (
    <Section className="flex flex-col items-center lg:h-full">
      <AuthenticatedDropdownMenu session={session} />
      <PromptShowcase prompt={prompt} />
      <Suspense fallback={<Icons.spinner className="w-8 h-8" />}>
        <ResultsShowcase
          user_credits={credits}
          user_id={userId}
          user_prompt={prompt}
        />
      </Suspense>
    </Section>
  );
};

export default GeneratePage;
