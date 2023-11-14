import { Button } from "@/components/ui/button";
import { SubmittionState, PromptHref } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { Icons } from "../ui/icons";

interface ConditionalLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  buttonState: SubmittionState;
  disabled: boolean;
  href: PromptHref;
  variant?:
    | "highlight"
    | "secondary"
    | "secondaryGradient"
    | "highlightGradient";
  small?: boolean;
  withMargin?: boolean;
}

const ConditionalLinkButton = ({
  buttonText,
  disabled,
  buttonState,
  variant,
  small,
  withMargin,
}: {
  buttonText: string;
  disabled: boolean;
  buttonState: SubmittionState;
  variant?:
    | "highlight"
    | "secondary"
    | "secondaryGradient"
    | "highlightGradient";
  small?: boolean;
  position?: "start" | "center" | "end";
  withMargin?: boolean;
}) => (
  <Button
    className={`w-full ${small ? "max-w-xs" : "max-w-2xl"} ${
      withMargin ? "mt-10" : "mt-0"
    } uppercase italic`}
    disabled={disabled}
    type="submit"
    variant={variant !== undefined ? variant : "highlight"}
  >
    {buttonState === "loading" && (
      <Icons.spinner className="animate-spin h-6 w-6" />
    )}
    {buttonState === "done" && <Icons.check className="h-5 w-5 mr-3" />}
    {buttonState === "error" && <Icons.close className="h-6 w-6" />}
    {buttonState === "idle" && <p>{buttonText}</p>}
  </Button>
);

const ConditionalLink = React.forwardRef<HTMLDivElement, ConditionalLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref}>
        {props.disabled ? (
          <ConditionalLinkButton
            buttonText={props.buttonText}
            disabled
            buttonState={props.buttonState}
            variant={props.variant}
            small={props.small}
            withMargin={props.withMargin}
          />
        ) : (
          <Link
            href={{
              pathname: props.href.pathname,
              query: props.href.query,
            }}
            passHref
          >
            <ConditionalLinkButton
              buttonText={props.buttonText}
              disabled={false}
              buttonState={props.buttonState}
              variant={props.variant}
              small={props.small}
              withMargin={props.withMargin}
            />
          </Link>
        )}
      </div>
    );
  }
);

export default ConditionalLink;
