'use client';

import { forwardRef } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PromptButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  authenticated: boolean;
  label: string;
  userId: number;
}

const PromptButton = forwardRef<HTMLButtonElement, PromptButtonProps>(
  ({ className, ...props }, ref) => {
    const currentPath = usePathname();

    return (
      <Link className="w-full" href={{
        pathname: "/generate",
        query: {
          prompt: props.label,
          userId: props.userId,
        },
      }} passHref>
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
