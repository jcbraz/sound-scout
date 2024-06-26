import Headers from "@/components/ui/headers";
import { Section } from "@/components/ui/section";
import { redirect } from "next/navigation";
import SignInPrompts from "./components/signin-prompts";
import { getServerSession } from "next-auth";
import SignInButton from "./components/signin-button";
import WorkflowShowcase from "./components/workflow-showcase";

export default async function SignIn() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <>
      <Section className="flex flex-col items-center space-y-28 flex-grow">
        <Headers />
        <SignInButton />
        <SignInPrompts />
      </Section>
      <WorkflowShowcase />
    </>
  );
}
