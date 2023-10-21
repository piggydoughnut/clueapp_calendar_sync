import Benefits from "@components/Benefits";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Layout from "@components/nav/Layout";
import calendar from "../public/calendar.svg";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();
  return (
    <Layout
      title="Hack Your Cycle"
      bgImage="bg-[url('/top-bg.svg')] bg-contain"
    >
      <div className="pt-24 sm:pt-[10rem]  scroll-smooth">
        <div className="flex flex-col sm:flex-row space-between gap-[10rem] justify-center">
          <div className="flex flex-col mx-4 sm:mx-0">
            <h1 className="text-xl lg:text-[46px] font-bold max-w-xl leading-10 lg:leading-tight">
              Sync your <span className=" text-mainPink">Google Calendar</span>{" "}
              with your cycle for higher productivity and balance.
            </h1>
            <h2 className="hidden sm:block text-sm max-w-lg opacity-70 mt-2">
              Increase your productivity by hacking your cycle. Schedule
              meetings on the days your are a rockstar and use the slow days for
              easy monotonus tasks.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-12 sm:mt-4">
              <div className="sm:hidden flex justify-center pt-4">
                <Image
                  src={calendar}
                  alt="calendar"
                  width={325}
                  height={348}
                  className="w-[325px]"
                />
              </div>
              <h2 className="block sm:hidden ml-2 sm:ml-0 text-sm max-w-md opacity-70 mt-8 sm:mt-2">
                Increase your productivity by hacking your cycle. Schedule
                meetings on the days your are a rockstar and use the slow days
                for easy monotonus tasks.
              </h2>
              {/* <Button
                className="bg-peachy w-full sm:w-full h-16 sm:h-11 capitalize font-plusJakarta"
                onClick={() => router.push("sync")}
                color="red"
              >
                Get my personalized cycle calendar
              </Button> */}
              <Button
                color="white"
                className="mt-6 h-14 w-full capitalize font-plusJakarta border border-black text-mainPink"
                onClick={() => router.push("sync")}
              >
                Get my personalized cycle calendar
              </Button>
            </div>
          </div>
          <div className="hidden sm:flex items-start bg-white shadow-md rounded-md p-6">
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
      <div
        className="mt-40 flex justify-center scroll-smooth"
        id="reasonsToDoIt"
      >
        <Benefits />
      </div>
    </Layout>
  );
}
