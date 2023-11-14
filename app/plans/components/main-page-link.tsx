import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const MainPageLink = () => {
  return (
    <div className="absolute left-0 top-0 ml-5 mt-5 lg:ml-10 lg:mt-10">
      <Link className="flex items-center" href="/">
        <MoveLeft className="w-4 h-4 mr-2" />
        <Logo className="lg:text-xl text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-c_grey to-neutral-600 italic max-w-2xl text-center">
          Sound Scout
        </Logo>
      </Link>
    </div>
  );
};

export default MainPageLink;
