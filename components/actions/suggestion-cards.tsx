import { promptExamples } from "@/lib/utils";
import PromptButton from "../ui/prompt-button";

type SuggestionCardsProps = {
  credits: number;
  userId: number;
};

const SuggestionCards = (props: SuggestionCardsProps) => {
  const pathToFollow = props.credits > 0 ? "/generate" : "/early-access";

  return (
    <form className="flex flex-col items-center justify-center space-y-6 text-neutral-900 w-full lg:max-w-2xl">
      <h4 className="lg:text-lg text-sm text-c_grey italic">
        Potential Prompts
      </h4>
      {promptExamples.map((prompt, index) => (
        <PromptButton
          authenticated
          key={index}
          label={prompt}
          path={pathToFollow}
          userId={props.userId}
        />
      ))}
    </form>
  );
};

export default SuggestionCards;
