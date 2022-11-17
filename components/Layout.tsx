import { Button } from "@material-tailwind/react";
import Link from "next/link";

const Navbar = () => (
  <div className="flex justify-between items-center mx-20 pt-4">
    <Link
      className="font-bold hover:text-indigo-400 transition-all hover:ease-in-out"
      href="/"
    >
      Cycle Nurture
    </Link>
    <div className="flex flex-row gap-12 items-center">
      <Link
        className="text-sm hover:underline hover:underline-offset-4 hover:decoration-2 transition-all hover:ease-in-out"
        href="/about"
      >
        The science
      </Link>
      <Link
        className="text-sm hover:underline hover:underline-offset-4 hover:decoration-2 transition-all hover:ease-in-out"
        href="/about"
      >
        About
      </Link>
      <Link
        className="text-sm hover:underline hover:underline-offset-4 hover:decoration-2 transition-all hover:ease-in-out"
        href="/about"
      >
        Pricing
      </Link>
      <Link
        className="text-sm hover:underline hover:underline-offset-4 hover:decoration-2 transition-all hover:ease-in-out"
        href="/about"
      >
        FAQ
      </Link>
    </div>
    <Link href="/signup">
      <Button
        variant="outlined"
        className=" w-36 h-11 uppercase text-sm font-plusJakarta"
      >
        Sign Up
      </Button>
    </Link>
  </div>
);
const Footer = () => <div></div>;

export default function Layout({
  bgImage = "bg-[url('/heart.svg')] bg-center bg-lightPink",
  children,
}) {
  return (
    <div className={`bg-no-repeat h-screen ${bgImage}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
