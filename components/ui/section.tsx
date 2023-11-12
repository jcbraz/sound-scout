import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <section
        className={cn(
          "w-full lg:h-screen h-full min-h-screen lg:p-24 p-12 bg-neutral-900 text-c_grey",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Section.displayName = "Section";

export { Section };
