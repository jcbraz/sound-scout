"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignIn() {

    const session = useSession();
    if (session && session.status === "authenticated") redirect("/");

    return (
        <div>
          <h1>Spotify Web API Typescript SDK in Next.js</h1>
          <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
          <p>{}</p>
        </div>
      );
}
