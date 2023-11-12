import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

type CheckoutButtonProps = {
  isSignedIn: boolean;
};

const CheckoutButton = (props: CheckoutButtonProps) => {
  if (props.isSignedIn) {
    return (
      <div className="pt-8">
        <Button
          className="bg-c_green text-white font-semibold text-sm"
          variant="highlight"
        >
          Get it now
          <MoveRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  } else {
    return (
      <div className="pt-8">
        <Link href="/auth/signin">
          <Button
            className="bg-c_green text-white font-semibold text-sm"
            variant="highlight"
          >
            Sign In with Spotify
          </Button>
        </Link>
      </div>
    );
  }
};

export default CheckoutButton;
