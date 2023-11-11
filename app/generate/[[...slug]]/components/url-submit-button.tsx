import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useFormStatus } from "react-dom";

const URLSubmitButton = () => {
  const status = useFormStatus();

  return (
    <Button
      className="w-full max-w-2xl mt-10 uppercase italic"
      disabled={status.pending}
      type="submit"
      variant="secondary"
    >
      {status.pending ? (
        <Icons.spinner className="animate-spin h-6 w-6" />
      ) : (
        "Get It On Spotify"
      )}
    </Button>
  );
};

export default URLSubmitButton;
