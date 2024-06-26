"use client";

import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import ConditionalLink from "./conditional-link";

type PromptInputProps = {
  credits: number;
  userId: number;
};

const PromptInput = (props: PromptInputProps) => {
  const [input, setInput] = useState<string>("");
  const hasValidInput = input.length > 5;
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    []
  );

  const pathToFollow =
    props.credits > 0
      ? {
          pathname: "/generate",
          query: {
            prompt: input,
            userId: props.userId,
          },
        }
      : {
          pathname: "/early-access",
          query: {
            userId: props.userId,
          },
        };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <Input
        id="main-prompt-input"
        onChange={handleInput}
        className="bg-c_grey border-2 border-white text-neutral-900 font-semibold"
        type="text"
        placeholder="Your Playlist Prompt"
      />
      <ConditionalLink
        buttonState="idle"
        buttonText="Submit Prompt"
        disabled={!hasValidInput}
        href={pathToFollow}
        withMargin
      />
    </div>
  );
};

export default PromptInput;
