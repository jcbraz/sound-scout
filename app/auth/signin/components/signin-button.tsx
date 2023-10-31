'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <Button
      variant="highlight"
      className="uppercase italic"
      onClick={() => signIn()}
    >
      Sign In With Spotify
    </Button>
  );
};

export default SignInButton;