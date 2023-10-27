import { Button } from "../ui/button";
import { Input } from "../ui/input";

const PromptInput = () => {
  return (
    <form
      className="w-full max-w-2xl flex flex-col items-center"
    >
      <Input
        className="bg-c_grey border-2 border-white text-neutral-900 font-semibold"
        type="text"
        placeholder="Your Playlist Prompt"
      />
      <Button
        variant="highlight"
        className="w-full max-w-xs mt-10 uppercase italic"
        type="submit"
      >
        Submit Prompt
      </Button>
    </form>
  );
};

export default PromptInput;
