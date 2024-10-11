import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t px-4 py-2">
      <div className="max-w-5xl mx-auto flex items-center justify-between ">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Messenger</Link>
        </h1>
        <address>
          <h2>Nagpur, Maharashtra, India</h2>
          <div className="flex items-center gap-1">
            <p>+91 1234567898</p>
            <p>+91 8989898987</p>
          </div>
        </address>
      </div>
      <p className="text-center">
        Copyright &copy; messenger.vercel.com {new Date().getFullYear()}
      </p>
    </footer>
  );
}
