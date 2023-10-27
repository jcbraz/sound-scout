import { promptExamples } from "@/lib/utils";
import PromptButton from "../ui/prompt-button";


const SuggestionCards = () => {
    return (
        <form className="flex flex-col items-center justify-center space-y-6 text-neutral-900 w-full lg:max-w-2xl">
            <h4 className="lg:text-lg text-sm text-c_grey italic">Potential Prompts</h4>
            {promptExamples.map((prompt, index) => (
                <PromptButton key={index} label={prompt} />
            ))}
        </form>
    )
}

export default SuggestionCards;