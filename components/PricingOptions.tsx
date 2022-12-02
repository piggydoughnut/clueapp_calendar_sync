import { Button, Input } from "@material-tailwind/react";
import { beginnerReasons, proReasons } from "../data/pricing";

import Image from "next/image";
import Pricing from "./Pricing";

export default function PricingOptions() {
  return (
    <div className="flex flex-row gap-12 justify-center">
      {/* <Pricing
        type=""
        title="Email yourself your personalized calendar 🤓"
        price="free"
        reasons={beginnerReasons}
      >
        <div className="flex flex-col gap-2 mt-28 w-[300px]">
          <Input label="your email"></Input>
          <Button
            className="bg-secondaryButton w-full h-11 capitalize"
            color={"indigo"}
            // onClick={() => setEmailVersion(true)}
          >
            Send me my Calendar
          </Button>
        </div>
      </Pricing> */}
      <Pricing
        type=""
        title="Monthly auto sync your cycle with your Google Calendar 😎"
        price="$1.77/mo"
        reasons={proReasons}
        highlight
      >
        <div className="flex flex-col gap-2 mt-6 w-[300px]">
          <div className="flex flex-col justify-center mx-auto">
            <h2 className="uppercase text-tiny opacity-50 mt-2 mb-2 text-center">
              Supported period trackers
            </h2>
            <Image
              className="mx-auto"
              src="/clue.png"
              width={120}
              height={40}
              alt="exteralSource"
            />
            <p className="max-w-[400px] text-tiny opacity-70">
              If you are not using Clue,{" "}
              <a className="underline hover:opacity-70" href="">
                please let us know which period tracker you use
              </a>
              . We are working on integrating more period trackers.
            </p>
          </div>
          <Button className="bg-transparent text-black border w-full h-11 capitalize">
            Sync with Google Calendar
          </Button>
        </div>
      </Pricing>
    </div>
  );
}
