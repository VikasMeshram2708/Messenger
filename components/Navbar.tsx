"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { status } = useSession();

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
            <Button
              onClick={() => signOut()}
              className="space-x-2"
              variant={"destructive"}
            >
              <span>
                <LogOut />
              </span>
              <span>Logout</span>
            </Button>
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
