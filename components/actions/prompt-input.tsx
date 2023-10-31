import { useState } from "react";
import { Input } from "../ui/input";
import ConditionalLink from "./conditional-link";

const PromptInput = () => {
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
        href={`/generate/${input}`}
      />
    </div>
  );
};

export default PromptInput;
