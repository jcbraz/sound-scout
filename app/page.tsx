import { redirect } from "next/navigation";
import { Section } from "@/components/ui/section";
import Headers from "@/components/ui/headers";
import PromptInput from "@/components/actions/prompt-input";
import SuggestionCards from "@/components/actions/suggestion-cards";
import AuthenticatedDropdownMenu from "@/components/ui/authenticated-dropdown-menu";
import { getServerSession } from "next-auth";
import { checkUserRegister } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { getUserCredits } from "@/db/queries";

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

  const credits = await getUserCredits(userDB as number);
  if (credits === undefined) {
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
      <PromptInput credits={credits as number} userId={userDB as number} />
      <SuggestionCards credits={credits as number} userId={userDB as number}/>
    </Section>
  );
}
