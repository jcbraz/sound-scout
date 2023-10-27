import { forwardRef } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PromptButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
}

const PromptButton = forwardRef<HTMLButtonElement, PromptButtonProps>(
  ({ className, ...props }, ref) => {
    return (
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
    );
  }
);

export default PromptButton;
