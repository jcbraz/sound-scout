import { Button } from "@/components/ui/button";
import Link from "next/link";

type SpotifyRedirectButtonProps = {
  url: string;
};

const SpotifyRedirectButton = (props: SpotifyRedirectButtonProps) => {
  return (
    <Button
      className="w-full max-w-2xl mt-10 uppercase italic"
      type="submit"
      variant="highlightGradient"
    >
      <Link href={props.url} target="_blank">
        View On Spotify
      </Link>
    </Button>
  );
};

export default SpotifyRedirectButton;
