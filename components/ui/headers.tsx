"use client";

import { Logo } from "./logo";
import useTypewriter from "./use-type-writter";

const Headers = () => {
  const displayText = useTypewriter("t/he spotify playlist engine", 50);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <Logo />
      <h3 className="lg:text-3xl text-xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-t from-c_grey to-c_green italic max-w-2xl text-center">
        {displayText}
      </h3>
    </div>
  );
};

export default Headers;
