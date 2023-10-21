import { useEffect, useState } from "react";

import { Button } from "@material-tailwind/react";
import Confetti from "react-confetti";
import Image from "next/image";
import Layout from "@components/nav/Layout";
import React from "react";
import { SignupSteps } from "@helpers/defines";
import { getGoogleAuthURL } from "../auth/google-auth";
import { useRouter } from "next/router";
import { useStoreState } from "easy-peasy";

const footnote = {
  [SignupSteps.GOOGLE]: (
    <>
      <b>Why? </b> <br />
      We need access to your calendar to add your cycle phase data there. <br />
      <br />
      <b>What are we going to do?</b> <br />
      We will create a separate calendar where we will add colour coded cycle
      phases. You can turn on/off that calendar as you like. <br />
      <br />
      <b>
        We will NOT have any access to your existing calendar events, only to
        the new calendar.
      </b>
      <br />
    </>
  ),
  [SignupSteps.FINISH]: (
    <p className="text-sm mt-16">
      In the case your Google calendar was not updated,{" "}
      <a
        className="underline hover:opacity-70 text-blue-400"
        href="mailto:support@dariah.dev"
      >
        please let us know
      </a>
      .
    </p>
  ),
  [SignupSteps.RETURNING]: (
    <p className="text-sm mt-16">
      In the case you didnt receive an email or your Google calendar was not
      updated,{" "}
      <a
        className="underline hover:opacity-70 text-blue-400"
        href="mailto:support@dariah.dev"
      >
        please let us know
      </a>
      .
    </p>
  ),
};

const headers = {
  [SignupSteps.GOOGLE]: "Sync your Cycle calendar with Google Calendar",
  [SignupSteps.FINISH]: "You are one step closer to a more balanced life",
  [SignupSteps.RETURNING]: "We are happy to see you come back!",
};

export default function Signup({ googleuri }: { googleuri: string }) {
  const [step, setStep] = useState(SignupSteps.GOOGLE);
  const [jwt, setJwt] = useState("");
  const router = useRouter();
  // @ts-ignore
  // FIXME
  const { periodData } = useStoreState((state) => state);

  useEffect(() => {
    if (router.query.jwt) {
      /* @ts-ignore */
      setJwt(router?.query?.jwt);
      setStep(SignupSteps.FINISH);
      router.push({ pathname: router.pathname, query: {} });
    }
    // show error if msg 400
    if (router.query.msg) {
      if (router.query.msg === "101") {
        setStep(SignupSteps.RETURNING);
        router.push({ pathname: router.pathname, query: {} });
      }
    }
  }, [router, jwt]);

  const redirectToGoogle = async () => {
    const url = new URL(googleuri);
    url.searchParams.append("state", JSON.stringify(periodData));
    const resultUrl = url.toString();
    router.push(`${resultUrl}`);
  };

  return (
    <Layout title="Hack Your Cycle: Signup">
      <h1 className="text-lg md:text-md lg:text-xl font-bold text-center mt-10 mb-2 pt-[2rem]">
        Sync your cycle with your Google calendar and schedule like a pro
        {step === SignupSteps.FINISH && (
          <Confetti
            className="mt-0"
            height={1000}
            gravity={0.1}
            numberOfPieces={3000}
            recycle={false}
            colors={["#EF9FC0", "#7A7CE1", "#FFB6B6", "#b6b7e2", "#ab1956"]}
          />
        )}
      </h1>
      <div className="flex flex-col justify-center items-center mt-24">
        <div className="flex flex-row justify-center items-center gap-8">
          <div className="bg-white w-full sm:w-[800px] p-4 h-auto pb-10 rounded-md shadow-pink-300 border-pink-300 border">
            <div className="flex flex-col items-center justify-center">
              <h2 className="mb-8 mt-8 font-bold text-center">
                {headers[step]}
              </h2>
              {(step === SignupSteps.RETURNING ||
                step === SignupSteps.FINISH) && (
                <div>
                  <p className="text-md mx-8">
                    We are updating your{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://calendar.google.com/"
                      className="underline text-blue-400"
                    >
                      Google calendar
                    </a>{" "}
                    with the new cycle data. You will notice a calendar named
                    &apos;My cycle&apos; (note that it could be different colour
                    for you). The changes should take up to 2-3 minutes.
                  </p>
                  <Image
                    src="/calendars.png"
                    alt="calendars"
                    width={250}
                    height={400}
                    className="mx-auto border border-gray-300 mt-6"
                  />
                </div>
              )}
              {step === SignupSteps.GOOGLE && (
                <>
                  <Button
                    color="white"
                    className="h-12 w-[300px] capitalize font-plusJakarta border border-black"
                    onClick={redirectToGoogle}
                  >
                    Google Calendar Auth{" "}
                  </Button>
                </>
              )}
              {!!step && (
                <p className="mt-10 text-tiny opacity-70">{footnote[step]}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const googleuri = getGoogleAuthURL();
  return {
    props: { googleuri }, // will be passed to the page component as props
  };
}
