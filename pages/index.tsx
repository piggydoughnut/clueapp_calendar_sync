import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Layout from "../components/Layout";
import calendar from "../public/calendar.svg";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();
  return (
    <Layout bgImage="bg-[url('/top-bg.svg')] bg-contain">
      <div className="pt-[10rem]">
        <div className="flex space-between gap-[10rem] justify-center">
          <div className="flex flex-col">
            <h1 className="md:text-md lg:text-xl font-bold max-w-xl leading-10">
              Sync your life with your cycle for higher productivity and
              balance.
            </h1>
            <h2 className="text-sm max-w-md opacity-70 mt-6">
              Increase your productivity by hacking your cycle. Schedule
              meetings on the days your are a rockstar and use the slow days for
              easy monotonus tasks.
            </h2>
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
    </Layout>
  );
}
