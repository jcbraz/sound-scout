import { Button } from "@/components/ui/button";
import Link from "next/link";

type SpotifyRedirectButtonProps = {
  url: string;
};

const SpotifyRedirectButton = (props: SpotifyRedirectButtonProps) => {
  return (
    <Link href={props.url}>
      <Button
        className="w-full max-w-2xl mt-10 uppercase italic"
        type="submit"
        variant="highlightGradient"
      >
        View On Spotify
      </Button>
    </Link>
  );
};

export default SpotifyRedirectButton;
