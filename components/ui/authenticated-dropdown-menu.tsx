import { CreditCard, FileClock, Flag, LogOut, UserCheck } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";

type AuthenticatedDropdownMenuProps = {
  name: string;
  email: string;
};

const AuthenticatedDropdownMenu = (props: AuthenticatedDropdownMenuProps) => {
  return (
    <div className="absolute right-0 top-0 mr-5 mt-5 lg:mr-10 lg:mt-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-center text-lg font-normal text-white"
          >
            <UserCheck className="mr-2 h-5 w-5" />{" "}
            <span className="sm:flex hidden">{props.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <FileClock className="mr-2 h-4 w-4" />
              <Link
                href={{
                  pathname: "/history",
                  query: { email: props.email },
                }}
                passHref
              >
                <span>Playlist History</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <Link href="/billing" passHref>
                <span>Billing</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem>
            <Flag className="mr-2 h-4 w-4" />
            <Link href="/settings" passHref>
              <span>Issues and Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthenticatedDropdownMenu;
