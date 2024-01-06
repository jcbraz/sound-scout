import Link from "next/link";

const FAQRedirectButton = () => {
  return (
    <Link href="/" passHref>
      <h6 className="text-xs italic max-w-sm text-center underline lg:mt-10 mt-4">
            Confused about the results? Check out our FAQ!
      </h6>
    </Link>
  );
};

export default FAQRedirectButton;
