import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <header className="w-full border-b shadow">
      <nav className="px-4 py-2 flex max-w-5xl mx-auto items-center justify-between">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Messenger</Link>
        </h1>
        <div className="flex items-center gap-2">
          <Button className="font-bold">Login / Sign Up</Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
