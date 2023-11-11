import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

type SuggestionsSubmitButtonProps = {
    isLoading: boolean;
};

const SuggestionsSubmitButton = (props: SuggestionsSubmitButtonProps) => {

  return (
    <Button
      className="w-full max-w-2xl mt-10 uppercase italic"
      disabled={props.isLoading}
      type="submit"
      variant="highlight"
    >
      {props.isLoading ? (
        <Icons.spinner className="animate-spin h-6 w-6" />
      ) : (
        "Generate Playlist"
      )}
    </Button>
  );
};

export default SuggestionsSubmitButton;
