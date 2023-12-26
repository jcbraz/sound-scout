"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useCallback } from "react";

const SignInButton = () => {
  const handleSignIn = useCallback(() => signIn(), []);

  return (
    <Button
      variant="highlight"
      className="uppercase italic"
      onClick={handleSignIn}
    >
      Sign In With Spotify
    </Button>
  );
};

export default SignInButton;
