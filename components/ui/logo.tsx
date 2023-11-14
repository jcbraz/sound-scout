import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface LogoProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Logo = forwardRef<HTMLHeadingElement, LogoProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        className={cn(
          "lg:text-6xl text-4xl font-bold uppercase italic",
          className
        )}
        ref={ref}
        {...props}
      >
        Sound Scout
      </h1>
    );
  }
);

Logo.displayName = "Logo";

export { Logo };
