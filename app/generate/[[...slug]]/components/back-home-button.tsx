import { Button } from "@/components/ui/button";
import Link from "next/link";

const BackHomeButton = () => {
  return (
    <Link href="/">
      <Button
        className="w-full lg:max-w-2xl max-w-md uppercase italic"
        type="submit"
        variant="secondaryGradient"
      >
        Generate Another Playlist
      </Button>
    </Link>
  );
};

export default BackHomeButton;
