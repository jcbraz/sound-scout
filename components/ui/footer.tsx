import Link from "next/link";
import { Button } from "./button";
import { Logo } from "./logo";

const Footer = () => {
  return (
    <footer className="grid lg:grid-cols-2 grid-cols-1 w-full bg-neutral-900 text-c_grey lg:h-1/2 h-full p-24 lg:space-y-0 space-y-6">
      <div className="flex flex-col lg:space-y-2 space-y-2">
        <Logo className="lg:text-2xl text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-c_grey to-neutral-600 italic max-w-2xl lg:text-start text-center" />
        <h6 className="text-c_grey lg:text-sm text-xs lg:text-start text-center font-thin italic">
          © All Rights Reserved.
        </h6>
      </div>
      <Link href="/report" className="flex lg:justify-end justify-center">
        <Button className="max-w-sm" variant="secondaryGradient">
          Report a Bug
        </Button>
      </Link>
    </footer>
  );
};

export default Footer;
