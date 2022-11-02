import { Button } from "@material-tailwind/react";
import Image from "next/image";
import calendar from "../public/calendar.svg";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();
  return (
    <div className="bg-[url('/top-bg.svg')] bg-lightPink mt-0 h-screen bg-no-repeat bg-contain pt-[10rem]">
      <div className="flex space-between gap-[10rem] justify-center">
        <div className="flex flex-col">
          <h1 className="md:text-md lg:text-xl font-bold max-w-xl">
            Sync your life with your cycle to be more attuned with your body.
          </h1>
          <div className="flex flex-row gap-8 mt-8">
            <Button className="bg-secondaryButton w-36 h-11 capitalize font-plusJakarta">
              Why?{" "}
            </Button>
            <Button
              className="bg-primaryButton w-36 h-11 capitalize font-plusJakarta"
              onClick={() => router.push("sync")}
            >
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
