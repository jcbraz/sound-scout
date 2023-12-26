import { forwardRef } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PromptButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  authenticated: boolean;
  label: string;
  path?: string;
  userId?: number;
}

const PromptButton = forwardRef<HTMLButtonElement, PromptButtonProps>(
  ({ className, ...props }, ref) => {
    const pathToFollow =
      props.path === "/generate"
        ? {
            pathname: props.path,
            query: {
              prompt: props.label,
              userId: props.userId,
            },
          }
        : {
            pathname: props.path,
            query: {
              userId: props.userId,
            },
          };

    return (
      <Link className="w-full" href={pathToFollow} passHref>
        <Button
          variant="secondary"
          type="submit"
          className={cn(
            "md:h-14 h-12 w-full items-center bg-c_grey text-neutral-900 lg:text-base text-xs font-normal text-lightBlack",
            className
          )}
          ref={ref}
        >
          {props.label}
        </Button>
      </Link>
    );
  }
);

export default PromptButton;
