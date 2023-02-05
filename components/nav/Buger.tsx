import { useEffect, useRef, useState } from "react";

import { Spin as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Burger = ({ menu }) => {
  const router = useRouter();
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [listeningEnabled, setListeningEnabled] = useState(false);
  const [listening, setListening] = useState(false);

  const c =
    "bg-white w-full h-full pt-24 pb-12 ease-linear transition absolute overflow-hidden";
  const classStyle = isOpen
    ? " translate-x-0 " + c
    : c + " translate-x-[-100%] ";

  useEffect(() => {
    if (!listeningEnabled) return;
    if (listening) return;
    if (!menuRef.current) return;
    let funcs = [];

    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      const listener = document.addEventListener(`click`, (evt) => {
        if (!menuRef.current) {
          return;
        }
        if (
          (menuRef.current && menuRef.current.contains(evt.target)) ||
          // @ts-ignore
          evt.target?.className === "hamburger-react"
        )
          return;
        setIsOpen(false);
        setListeningEnabled(false);
      });
      funcs.push(listener);
    });
    return () => {
      funcs.map((f) => document.removeEventListener("click", f));
    };
  }, [listeningEnabled, listening]);

  return (
    <div className="flex flex-row justify-end z-10">
      <div className="flex flex-row pr-6 pt-8 z-10">
        <Hamburger
          // @ts-ignore
          className="hamburger-react"
          toggled={isOpen}
          toggle={() => {
            setIsOpen(!isOpen);
            setListeningEnabled(!isOpen);
          }}
          color="#151313"
        />
      </div>
      <div className={classStyle} ref={menuRef}>
        <div className="pl-12 flex flex-col align-start gap-8 justify-start">
          {menu.map((item) => (
            <div
              key={item.name}
              className="text-xl uppercase cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setListeningEnabled(false);
                router.push(item.url);
              }}
            >
              {item.name}
            </div>
          ))}
          <Link className="font-bold" href="/">
            Hack Your Cycle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Burger;
