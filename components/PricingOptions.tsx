import { Button, Input } from "@material-tailwind/react";
import { beginnerReasons, proReasons } from "../data/pricing";

import Image from "next/image";
import Pricing from "./Pricing";
import { useRouter } from "next/router";

export default function PricingOptions() {
  const router = useRouter();
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
            <p className="max-w-[400px] text-tiny opacity-70 text-center">
              <a className="underline hover:opacity-70" href="">
                Not using Clue?
              </a>
            </p>
          </div>
          <Button
            className="bg-transparent text-black border w-full h-11 capitalize"
            onClick={() => router.push("/signup")}
          >
            Sync with Google Calendar
          </Button>
        </div>
      </Pricing>
    </div>
  );
}
