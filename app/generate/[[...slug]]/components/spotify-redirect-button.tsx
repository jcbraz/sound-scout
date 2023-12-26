import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

type SpotifyRedirectButtonProps = {
  url: string;
};

const SpotifyRedirectButton = (props: SpotifyRedirectButtonProps) => {
  const [wasClicked, setClicked] = useState<boolean>(false);

  const handleClick = useCallback(() => setClicked(true), []);

  return (
    <a href={props.url} target="_blank" rel="noreferrer">
      <Button
        className="w-full lg:max-w-2xl max-w-md uppercase italic"
        disabled={wasClicked}
        type="submit"
        variant="highlightGradient"
        onClick={handleClick}
      >
        {!wasClicked ? "View On Spotify" : "Spotify was opened!"}
      </Button>
    </a>
  );
};

export default SpotifyRedirectButton;
