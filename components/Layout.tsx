import { Button } from "@material-tailwind/react";
import Link from "next/link";

const menu = [
  {
    name: "The science",
    url: "#whydoit",
  },
  {
    name: "About",
    url: "#",
  },
  {
    name: "Pricing",
    url: "#",
  },
  {
    name: "FAQ",
    url: "",
  },
];

const Navbar = () => (
  <div className="flex justify-between items-center mx-20 pt-4">
    <Link
      className="font-bold hover:text-indigo-400 transition-all hover:ease-in-out"
      href="/"
    >
      Cycle Nurture
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
);
const Footer = () => (
  <div className="bg-white mt-20 pl-20 pr-20 pt-8 pb-8 ml-2 mr-2 mb-2 rounded-md flex flex-row justify-between">
    <div className="flex flex-col">
      <h3 className="font-bold mb-2">Hack the Cycle</h3>
      <p>
        Be efficient with your cycle and <br /> schedule like a pro
      </p>
      <a href="mailto:me" className="mt-4 underline hover:opacity-70">
        hello@hackthecyle.com
      </a>
    </div>
    <div className="flex flex-row gap-12">
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
  </div>
);

export default function Layout({
  bgImage = "bg-[url('/heart.svg')] bg-center bg-lightPink",
  children,
}) {
  return (
    <div className={`bg-no-repeat ${bgImage} scroll-smooth`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
