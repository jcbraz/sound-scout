import Link from "next/link";

type PromptShowcaseProps = {
  prompt: string;
};

const PromptShowcase = (props: PromptShowcaseProps) => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h4 className="lg:text-xl text-sm font-normal">Your Prompt:</h4>
      <h2 className="lg:text-6xl text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-c_green to-c_grey italic max-w-2xl text-center">
        {props.prompt.split(",").at(0) || props.prompt}
      </h2>
      <h6 className="text-xs italic max-w-sm text-center">
        Not really feeling this prompt?{" "}
        <Link href="/" passHref>
          <span className="italic underline">Insert a new prompt</span>
        </Link>
      </h6>
    </div>
  );
};

export default PromptShowcase;
