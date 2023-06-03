import { Button, Progress } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import Confetti from "react-confetti";
import Image from "next/image";
import Layout from "@components/nav/Layout";
import React from "react";
import { SignupSteps } from "@helpers/defines";
import { getGoogleAuthURL } from "../auth/google-auth";
import { useRouter } from "next/router";

const StepsExplanation = {
  [SignupSteps.GOOGLE]: () => (
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
};

export default function Signup({ googleuri }: { googleuri: string }) {
  const [step, setStep] = useState(SignupSteps.GOOGLE);
  const [jwt, setJwt] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.jwt) {
      /* @ts-ignore */
      setJwt(router?.query?.jwt);
      setStep(SignupSteps.CLUE);
      router.push({ pathname: router.pathname, query: {} });
    }
    // show error if msg 400
    if (router.query.msg) {
      if (router.query.msg === "101") {
        setAlreadyRegistered(true);
        setStep(0);
        router.push({ pathname: router.pathname, query: {} });
      }
    }
  }, [router, jwt]);

  return (
    <Layout title="Hack The Cycle: Signup">
      <h1 className="text-lg md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[2rem] pb-[2rem]">
        Sync your cycle with your Google calendar and schedule like a pro.
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
              {step > 0 && (
                <Progress
                  barProps={{
                    className: "bg-red-100",
                  }}
                  className="max-w-[500px] border border-black h-4 bg-white mt-4"
                  value={(100 / 4) * step}
                />
              )}
              {alreadyRegistered && (
                <div>
                  <h1 className="text-lg font-bold text-center mt-8">
                    We are happy to see you come back!
                  </h1>
                  <p className="text-md mx-8 mt-8">
                    We have updated you{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://calendar.google.com/"
                      className="underline text-blue-400"
                    >
                      Google calendar
                    </a>{" "}
                    with the new cycle data. There should be a calendar named
                    &apos;My cycle&apos; (note that it could be different colour
                    for you).
                  </p>
                  <Image
                    src="/calendars.png"
                    alt="calendars"
                    width={250}
                    height={400}
                    className="mx-auto border border-gray-300 mt-6"
                  />
                  <p className="text-sm mt-16 mx-8">
                    In the case you didn&apos;t receive an email or your Google
                    calendar was not updated,{" "}
                    <a
                      className="underline hover:opacity-70 text-blue-400"
                      href="mailto:support@hack-the-cycle.com"
                    >
                      please let us know
                    </a>
                    .
                  </p>
                </div>
              )}
              {step === SignupSteps.GOOGLE && (
                <>
                  <h2 className="mb-4 mt-8 font-bold text-center">
                    Sync your Cycle calendar with Google Calendar
                  </h2>
                  <Button
                    color="white"
                    className="h-12 w-[300px] capitalize font-plusJakarta border border-black"
                    onClick={() => router.push(googleuri)}
                  >
                    Google Calendar Auth{" "}
                  </Button>
                </>
              )}
              {step === SignupSteps.FINISH && (
                <>
                  <div className="flex flex-col justify-center items-center">
                    <div className="text-center">
                      <h2 className="text-lg mt-6 text-center">
                        You are one step closer to a more balanced life.
                      </h2>
                      <p className="mt-4">
                        We sent you a confirmation email with more details to
                        your gmail account.
                      </p>
                    </div>{" "}
                    <Button
                      color="white"
                      className="h-12 w-[300px] capitalize font-plusJakarta border border-black mt-16"
                      onClick={() => router.push("https://gmail.com")}
                    >
                      Open Gmail
                    </Button>
                    <p className="text-sm mt-16">
                      In the case you didnt receive an email or your Google
                      calendar was not updated,{" "}
                      <a
                        className="underline hover:opacity-70 text-blue-400"
                        href="mailto:support@hack-the-cycle.com"
                      >
                        please let us know
                      </a>
                      .
                    </p>
                  </div>
                </>
              )}
              {!!step && (
                <p className="mt-14 text-tiny pl-10 pr-10 opacity-70 max-w-[600px]">
                  {StepsExplanation[step]()}
                </p>
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