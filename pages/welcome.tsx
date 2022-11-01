import { Button } from "@material-tailwind/react";
import Image from "next/image";
import calendar from "../public/calendar.svg";

export default function Welcome() {
  return (
    <div className="bg-[url('/top-bg.svg')] mt-0 h-screen bg-no-repeat bg-contain pt-[10rem]">
      <div className="flex space-between gap-[10rem] justify-center">
        <div className="flex flex-col">
          <h1 className="md:text-md lg:text-xl font-bold max-w-xl">
            Sync your calendar with your cycle to be more attuned with your
            body.
          </h1>
          <div className="flex flex-row gap-8 mt-8">
            <Button className="bg-indigo-400 w-36 h-11 capitalize">
              Why?{" "}
            </Button>
            <Button className="bg-red-200 w-36 h-11 capitalize">
              Show me{" "}
            </Button>
          </div>
        </div>
        <div className="flex pt-4">
          <Image
            src={calendar}
            alt="calendar"
            width={325}
            height={348}
            className="w-[325px]"
          />
        </div>
      </div>
    </div>
  );
}
