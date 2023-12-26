"use client";

import { Bug, FileClock, LogOut, UserCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { useCallback } from "react";

type AuthenticatedDropdownMenuProps = {
  session: Session | null;
};

const AuthenticatedDropdownMenu = (props: AuthenticatedDropdownMenuProps) => {
  const handleSignOut = useCallback(() => signOut(), []);

  return (
    <div
      className={
        props.session !== null
          ? "absolute right-0 top-0 mr-5 mt-5 lg:mr-10 lg:mt-10"
          : "hidden"
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-center text-lg font-normal text-white"
          >
            <UserCheck className="mr-2 h-5 w-5" />{" "}
            <span className="sm:flex hidden">
              {props.session ? props.session.user?.name : ""}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FileClock className="mr-2 h-4 w-4" />
            <Link
              href={{
                pathname: "/menu/history",
                query: {
                  email: props.session ? props.session.user?.email : "",
                },
              }}
              passHref
            >
              <span>Playlist History</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <Link href={{
                pathname: "/menu/plans",
                query: {
                  userId: props.session ? props.session.user?.name : "",
                }
              }} passHref>
                <span>Credit Plans</span>
              </Link>
            </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            <UserCircle2 className="mr-2 h-4 w-4" />
            <Link href="/menu/settings" passHref>
              <span>Account</span>
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Bug className="mr-2 h-4 w-4" />
            <Link href="/feedback" passHref>
              <span>Report a Bug</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthenticatedDropdownMenu;
