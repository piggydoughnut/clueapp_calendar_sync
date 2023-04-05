import Burger from "./Buger";
import { Button } from "@material-tailwind/react";
import Footer from "./Footer";
import Link from "next/link";

const menu = [
  {
    name: "The science",
    url: "/#whydoit",
  },
  {
    name: "Pricing",
    url: "/pricing",
  },
  {
    name: "Calendar",
    url: "/sync",
  },
];

const Navbar = () => (
  <>
    {" "}
    {/* <div className="hidden sm:flex flex-col sm:flex-row justify-between items-center mx-4 sm:mx-20 pt-4"> */}
    <div className="hidden sm:flex flex-col sm:flex-row justify-between items-center mx-4 md:mx-20 pt-4">
      <Link
        className="font-bold hover:text-indigo-400 transition-all hover:ease-in-out"
        href="/"
      >
        Hack Your Cycle
      </Link>
      <div className="flex flex-row gap-12 items-center">
        {menu.map((item) => (
          <Link
            key={item.name}
            className="text-sm hover:underline hover:underline-offset-4 hover:decoration-2 transition-all hover:ease-in-out"
            href={item.url}
          >
            {item.name}
          </Link>
        ))}
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
    <div className="sm:hidden flex flex-row justify-between items-center">
      <Link
        className="font-bold hover:text-indigo-400 transition-all hover:ease-in-out pt-8 text-lg ml-4"
        href="/"
      >
        Hack Your Cycle
      </Link>
      <Burger menu={menu} />
    </div>
  </>
);

export default function Layout({
  bgImage = "bg-[url('/heart.svg')] bg-center bg-peachy",
  className,
  children,
}: {
  bgImage?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      // className={`bg-no-repeat bg-[url('/mobile-bg.svg')] sm:${bgImage} scroll-smooth mx-4 md:mx-20`}
      className={`bg-no-repeat ${bgImage} scroll-smooth ${className}`}
    >
      <Navbar />
      <div className="mx-4 sm:mx-10 lg:mx-0">
        <main>{children}</main>
      </div>
      <Footer menu={menu} />
    </div>
  );
}
