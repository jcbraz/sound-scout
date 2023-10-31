import PromptButton from "@/components/ui/prompt-button";
import { promptExamples } from "@/lib/utils";

const SignInPrompts = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-neutral-900 w-full lg:max-w-2xl">
      <h4 className="lg:text-lg text-sm text-c_grey italic">
        Potential Prompts
      </h4>
      {promptExamples.map((prompt, index) => (
        <PromptButton
          authenticated={false}
          key={index}
          label={prompt}
        />
      ))}
    </div>
  );
};

export default SignInPrompts;
