import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import burgerIcon from "../public/burger-icon.svg";

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
    name: "FAQ",
    url: "/pricing#faq",
  },
];

const Navbar = () => (
  <>
    {" "}
    {/* <div className="hidden sm:flex flex-col sm:flex-row justify-between items-center mx-4 sm:mx-20 pt-4"> */}
    <div className="hidden sm:flex flex-col sm:flex-row justify-between items-center pt-4">
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
    <div className="sm:hidden mx-4 pt-4">
      <div className="flex flex-row justify-between items-center">
        <Link
          className="font-bold hover:text-indigo-400 transition-all hover:ease-in-out"
          href="/"
        >
          Hack Your Cycle
        </Link>
        <Image src={burgerIcon} alt="menuicon" height="40" />
      </div>
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
        The content presented on this website is meant for inspiration and
        informational purposes only. The user of this website understands that
        the creator is not a medical professional, and the information contained
        within this website is not intended to replace medical advice or to be
        relied upon to treat, cure or prevent any disease, illness or medical
        condition. It is understood that you will seek full medical clearance by
        a licensed physician before making any changes mentioned on this
        website. The author claims no responsibility to any person or entity for
        any liability, loss or damage caused or alleged to be caused directly or
        indirectly as a result of the use, application or interpretation of the
        material on this website
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
      className={`bg-no-repeat sm:${bgImage} scroll-smooth mx-4 md:mx-20`}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
