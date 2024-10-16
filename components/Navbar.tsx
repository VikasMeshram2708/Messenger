/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { status, data } = useSession();

  useEffect(() => {}, [status]);
  return (
    <header className="w-full border-b shadow">
      <nav className="px-4 py-2 flex max-w-5xl mx-auto items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Messenger</Link>
        </h1>
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <span>Loading...</span>
          ) : status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  `flex items-center gap-1`,
                  buttonVariants({ variant: "default" })
                )}
              >
                <span>
                  <User className="w-5 h-5" />
                </span>
                {/* @ts-ignore */}
                <span>{data?.user?.username}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>
                    <User className="w-5 h-5" />
                  </span>
                  <Link href="/u/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    onClick={() => signOut()}
                    variant={"destructive"}
                    className="w-full flex gap-1"
                  >
                    <span>
                      <LogOut className="w-5 h-5" />
                    </span>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="font-bold">
              <Link href="/u/signup">Login / Sign Up</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
