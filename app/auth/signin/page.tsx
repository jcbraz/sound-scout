"use client";

import { Button } from "@/components/ui/button";
import Headers from "@/components/ui/headers";
import { Section } from "@/components/ui/section";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SignInPrompts from "./components/signin-prompts";

export default function SignIn() {

    const session = useSession();
    if (session && session.status === "authenticated") redirect("/");

    return (
        <Section className="flex flex-col items-center space-y-28">
          <Headers />
          <Button variant="highlight" className="uppercase italic" onClick={() => signIn()}>Sign In With Spotify</Button>
          <SignInPrompts />
        </Section>
      );
}
