import AuthenticatedDropdownMenu from "@/components/ui/authenticated-dropdown-menu";
import { Section } from "@/components/ui/section";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PromptShowcase from "./components/prompt-showcase";
import ResultsShowcase from "./components/results-showcase";

const GeneratePage = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/auth/signin");

  const { slug } = params;
  if (slug === "") redirect("/");
  const prompt = decodeURIComponent(slug);

  return (
    <Section className="flex flex-col items-center lg:h-full">
      <AuthenticatedDropdownMenu session={session} />
      <PromptShowcase prompt={prompt} />
      <ResultsShowcase user_prompt={prompt} />
    </Section>
  );
};

export default GeneratePage;
