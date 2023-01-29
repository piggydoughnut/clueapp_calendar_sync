import { Button } from "@material-tailwind/react";
import { Spin as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState } from "react";

const menu = [
  {
    name: "The science",
    url: "/#whydoit",
  },
  // {
  //   name: "About",
  //   url: "/about",
  // },
  {
    name: "Pricing",
    url: "/pricing",
  },
  {
    name: "Calendar",
    url: "/sync",
  },
  // {
  //   name: "FAQ",
  //   url: "/pricing#faq",
  // },
];

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const c =
    "bg-white w-full h-full pt-24 pb-12 ease-linear transition absolute overflow-hidden";
  const classStyle = isOpen
    ? " translate-x-0 " + c
    : c + " translate-x-[-100%] ";
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-row pr-8 pt-8 z-10">
        <Hamburger toggled={isOpen} toggle={setIsOpen} color="#151313" />
      </div>
      <div className={classStyle}>
        <div className="pl-12 flex flex-col align-start gap-8 justify-start">
          {menu.map((item) => (
            <Link
              key={item.name}
              className="text-xl uppercase"
              href={item.url}
              g
            >
              {item.name}
            </Link>
          ))}
          <Link className="font-bold" href="/">
            Hack Your Cycle
          </Link>
        </div>
      </div>
    </div>
  );
};

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
      <Burger />
    </div>
  </>
);
const Footer = () => (
  <div className="bg-white mt-20 pl-4 sm:pl-20 pr-4 sm:pr-20 pt-8 pb-8 ml-2 mr-2 mb-2 rounded-md border-peachy border-4">
    <div className="flex flex-col-reverse sm:flex-row justify-center text-center sm:text-left sm:justify-between">
      <div className="flex flex-col">
        <h3 className="font-bold mb-2">Hack the Cycle</h3>
        <p>
          Be efficient with your cycle and <br /> schedule like a pro
        </p>
        <a href="mailto:me" className="mt-4 underline hover:opacity-70">
          hello@hackthecyle.com
        </a>
      </div>
      <div className="flex flex-row justify-center sm:justify-end gap-12 mb-8 sm:mb-0">
        {menu.map((item) => (
          <Link
            key={item.name}
            className="text-sm underline hover:underline hover:underline-offset-4 hover:decoration-2 transition-all hover:ease-in-out"
            href={item.url}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
    <div className="mt-12 opacity-50 text-tiny">
      <p className="font-bold uppercase">DISCLAIMER</p>
      <p>
        The information provided on this website is intended to be used for
        educational and inspirational purposes only, it`&apos;`s not intended to
        be a substitute for professional medical advice, diagnosis, or
        treatment. The website`&apos;`s creator is not a medical professional,
        and the information contained on this website should not be used to
        diagnose or treat any health issues. It`&apos;`s important to seek
        advice from a licensed physician or healthcare professional before
        making any changes to your health regimen. The author of this website
        cannot be held responsible for any damages or losses that may occur as a
        result of using, interpreting or applying the information provided on
        this website.
      </p>
    </div>
  </div>
);

export default function Layout({
  bgImage = "bg-[url('/heart.svg')] bg-center bg-peachy",
  children,
}) {
  return (
    <div
      // className={`bg-no-repeat bg-[url('/mobile-bg.svg')] sm:${bgImage} scroll-smooth mx-4 md:mx-20`}
      className={`bg-no-repeat ${bgImage} scroll-smooth`}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
