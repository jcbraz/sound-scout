import ConditionalLink from "@/components/actions/conditional-link";
import { getServerSession } from "next-auth";

type HrefButtonProps = {
  href: string;
  text: string;
};

const HrefButton = async (props: HrefButtonProps) => {
  const session = await getServerSession();

  return (
    <ConditionalLink
      className="flex justify-end"
      buttonText={props.text}
      buttonState="idle"
      disabled={!session}
      placeholder={props.text}
      href={{
        pathname: props.href,
      }}
      variant="secondaryGradient"
      small
      withMargin={false}
    />
  );
};

export default HrefButton;
