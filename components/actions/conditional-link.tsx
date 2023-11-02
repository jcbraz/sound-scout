import { Button } from "@/components/ui/button";
import { ButtonState, PromptHref } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { Icons } from "../ui/icons";

interface ConditionalLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  href: PromptHref;
  buttonText: string;
  buttonState: ButtonState;
}

const ConditionalLinkButton = ({
  buttonText,
  disabled,
  buttonState,
}: {
  buttonText: string;
  disabled: boolean;
  buttonState: ButtonState;
}) => (
  <Button
    variant="highlight"
    className="w-full max-w-2xl mt-10 uppercase italic"
    type="submit"
    disabled={disabled}
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
            />
          </Link>
        )}
      </div>
    );
  }
);

export default ConditionalLink;
