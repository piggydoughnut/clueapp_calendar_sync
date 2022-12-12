import { Button, Progress } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import ClueLogin from "../components/ClueLogin";
import Confetti from "react-confetti";
import Layout from "../components/Layout";
import axios from "axios";
import { getGoogleAuthURL } from "../auth/google-auth";
import { useRouter } from "next/router";

const Steps = {
  GOOGLE: 1,
  CLUE: 2,
  PAYMENT: 3,
  FINISH: 4,
};

export default function Signup({ googleuri }: { googleuri: string }) {
  const [step, setStep] = useState(Steps.GOOGLE);
  const [jwt, setJwt] = useState();
  const [clueData, setClueData] = useState(null);
  const [cycleData, setCycleData] = useState(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.jwt) {
      setJwt(router?.query?.jwt);
      setStep(Steps.CLUE);
      router.push({ pathname: router.pathname, query: {} });
    }
  }, [router.query, jwt]);

  useEffect(() => {
    if (clueData && cycleData) {
      axios
        .put(
          "/api/users",
          {
            access: clueData,
            data: cycleData,
          },
          {
            headers: {
              Authorization: jwt,
            },
          }
        )
        .then(() => {
          setStep(Steps.FINISH);
          if (!confirmationSent) {
            console.log("sendinggg");
            setConfirmationSent(true);
            axios
              .post(
                "/api/emails/confirmation",
                {},
                {
                  headers: { Authorization: jwt },
                }
              )
              .then(() => {
                console.log("confirmation sent");
              })
              .catch((e) => {
                console.log(e);
                setConfirmationSent(false);
              });
          }
        });
    }
  }, [clueData, cycleData]);

  return (
    <Layout>
      <h1 className="text-lg md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[2rem] pb-[2rem]">
        Sync your cycle with your Google calendar and schedule like a pro.
      </h1>
      <div className="flex flex-col justify-center items-center mt-24">
        <div className="flex flex-row justify-center items-center gap-8">
          <div className="bg-white w-full sm:w-[800px] p-4 h-[450px] rounded-md">
            {step === Steps.GOOGLE && (
              <div className="flex flex-col items-center justify-center">
                <Progress
                  color="light-blue"
                  className="max-w-[500px] border border-black h-4 bg-white"
                  value={(100 / 4) * step}
                />
                <h2 className="mb-8 mt-14 font-bold text-center">
                  STEP 1 GOOGLE CALENDAR PERMISSION
                </h2>
                <Button
                  color="white"
                  className="h-12 w-[300px] capitalize font-plusJakarta border border-black"
                  onClick={() => router.push(googleuri)}
                >
                  Google Calendar Auth{" "}
                </Button>
                <p className="mt-4 text-tiny pl-10 pr-10 opacity-70 max-w-[600px]">
                  <b>Why? </b> <br />
                  We need access to your calendar to add your cycle phase data
                  there. <br />
                  <br />
                  <b>What are we going to do?</b> <br />
                  We will create a separate calendar where we will add colour
                  coded cycle phases. You can turn on/off that calendar as you
                  like. <br />
                  <br />
                  <b>
                    We will not have any access to your existing calendar
                    events, only to the new calendar.
                  </b>
                </p>
              </div>
            )}
            {step === Steps.CLUE && (
              <div className="flex flex-col items-center justify-center">
                <Progress
                  color="light-blue"
                  className="max-w-[500px] border border-black h-4 bg-white"
                  value={(100 / 4) * step}
                />
                <h2 className="mb-8 mt-14 font-bold text-center">
                  STEP 2 CLUE LOGIN DETAILS
                </h2>{" "}
                <div className=" w-[300px]">
                  <ClueLogin
                    setCycleData={(a) => setCycleData(a)}
                    buttonTitle="Sync with Clue"
                    getUserData={(data) => setClueData(data)}
                  />
                </div>
                <p className="mt-4 text-sm">
                  <b>Why do we need this? </b> <br />
                  We need access to your cycle information to create calendar
                  events. <br />
                  <br />
                  <b>
                    Your access details and your cycle information are stored in
                    an encrypted format.
                  </b>
                </p>
              </div>
            )}
            {step === Steps.PAYMENT && <div>Payment</div>}
            {step === Steps.FINISH && (
              <div className="flex flex-col justify-center items-center">
                <Confetti
                  className="mt-0"
                  width={2000}
                  height={1000}
                  gravity={0.1}
                  numberOfPieces={3000}
                  recycle={false}
                  colors={[
                    "#EF9FC0",
                    "#7A7CE1",
                    "#FFB6B6",
                    "#b6b7e2",
                    "#ab1956",
                  ]}
                  // @todo draw hearts
                  // drawShape={(ctx) => {
                />
                <div className="text-center">
                  <h2 className="text-lg mt-12 text-center">
                    Congratulations! <br /> <br />
                    You are one step closer to a more balanced life.
                  </h2>
                  <p className="mt-4">
                    We sent you a confirmation email with more details to your
                    gmail account.
                  </p>
                </div>{" "}
                <Button
                  color="white"
                  className="h-12 w-[300px] capitalize font-plusJakarta border border-black mt-16"
                  onClick={() => router.push("https://gmail.com")}
                >
                  Open Gmail
                </Button>
              </div>
            )}
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
