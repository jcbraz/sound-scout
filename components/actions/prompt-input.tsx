"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import ConditionalLink from "./conditional-link";

type PromptInputProps = {
  userId: number;
};

const PromptInput = (props: PromptInputProps) => {
  const [input, setInput] = useState<string>("");
  const hasValidInput = input.length > 5;

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <Input
        id="main-prompt-input"
        onChange={(e) => setInput(e.target.value)}
        className="bg-c_grey border-2 border-white text-neutral-900 font-semibold"
        type="text"
        placeholder="Your Playlist Prompt"
      />
      <ConditionalLink
        buttonState="idle"
        buttonText="Submit Prompt"
        disabled={!hasValidInput}
        href={{
          pathname: "/generate",
          query: {
            prompt: input,
            userId: props.userId,
          },
        }}
      />
    </div>
  );
};

export default PromptInput;
