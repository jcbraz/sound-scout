import PromptButton from "@/components/ui/prompt-button";
import { promptExamples } from "@/lib/utils";
import { MoveDown } from "lucide-react";

const SignInPrompts = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-20 w-full">
      <div className="flex flex-col items-center justify-center space-y-6 text-neutral-900 w-full lg:max-w-2xl">
        <h4 className="lg:text-lg text-sm text-c_grey italic">
          Potential Prompts
        </h4>
        {promptExamples.map((prompt, index) => (
          <PromptButton authenticated={false} key={index} label={prompt} />
        ))}
      </div>
      <MoveDown className="w-6 h-6 text-c_grey animate-bounce" />
    </div>
  );
};

export default SignInPrompts;
