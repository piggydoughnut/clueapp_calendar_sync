import { Button, Input, Progress } from "@material-tailwind/react";

import Layout from "../components/Layout";
import { getGoogleAuthURL } from "../auth/google-auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup({ googleuri }: { googleuri: string }) {
  const [step, setStep] = useState(1);
  const router = useRouter();
  console.log(googleuri);
  return (
    <Layout>
      <h1 className="text-lg md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[2rem] pb-[2rem]">
        Sync your cycle with your Google calendar and schedule like a pro.
      </h1>
      <div className="flex flex-col justify-center items-center mt-24">
        <div className="flex flex-row justify-center items-center gap-8">
          <div className="bg-white w-full sm:w-[800px] p-4 h-[450px] rounded-md">
            {step === 1 && (
              <div className="flex flex-col items-center justify-center">
                <Progress
                  color="purple"
                  className="max-w-[500px]"
                  value={(100 / 4) * step}
                />
                <h2 className="mb-8 mt-14 font-bold text-center">
                  STEP 1 GOOGLE CALENDAR PERMISSION
                </h2>
                <Button
                  className="h-11 w-[300px] capitalize font-plusJakarta"
                  onClick={
                    () => router.push(googleuri)
                    // signIn("google", { callbackUrl: "/api/auth/google" })
                  }
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
            {step === 2 && (
              <div className="flex flex-col items-center justify-center">
                <Progress
                  color="purple"
                  className="max-w-[500px]"
                  value={(100 / 4) * step}
                />
                <h2 className="mb-8 mt-14 font-bold text-center">
                  STEP 2 CLUE LOGIN DETAILS
                </h2>{" "}
                <div className=" w-[300px] flex flex-col gap-2">
                  <Input label="your email"></Input>
                  <Input label="your password"></Input>
                  <Button
                    className="bg-red-300 w-full h-11 capitalize font-plusJakarta"
                    onClick={() => console.log("c")}
                  >
                    Sync with tracker
                  </Button>
                </div>
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
          </div>

          {/* <div className="bg-white w-[400px] p-4 h-[420px] rounded-md">
            <h2 className="mb-8 mt-4 font-bold"> STEP 2 CLUE LOGIN</h2>
            <Input label="your email"></Input>
            <Input label="your password"></Input>
            <Button
              className="bg-red-300 w-full h-11 capitalize font-plusJakarta"
              onClick={() =>
                signIn("google", { callbackUrl: "/api/auth/google" })
              }
            >
              Sync with tracker
            </Button>
            <p className="mt-4 text-sm">
              <b>Why do we need this? </b> <br />
              We need access to your cycle information. <br />
              <br />
              <b>What are we going to do?</b> <br />
              Access details are stored in encrypted format <br />
              <br />
              <b>
                We highly value your privacy and hence we do not save any of
                your cycle data.
              </b>
            </p>
          </div> */}
        </div>
        {/* <div className="bg-white w-[400px] p-4 mt-10">
          <h2 className="mb-8 mt-4 font-bold"> STEP 3 SUBSCRIPTION</h2>
          <Input label="your email"></Input>
          <Input label="your password"></Input>
          <Button
            className="bg-red-300 w-full h-11 capitalize font-plusJakarta"
            onClick={() =>
              signIn("google", { callbackUrl: "/api/auth/google" })
            }
          >
            Sync with tracker
          </Button>
          <p className="mt-4 text-sm">
            <b>Why do we need this? </b> <br />
            We need access to your cycle information. <br />
            <br />
            <b>What are we going to do?</b> <br />
            Access details are stored in encrypted format <br />
            <br />
            <b>
              We highly value your privacy and hence we do not save any of your
              cycle data.
            </b>
          </p>
        </div> */}
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const googleuri = getGoogleAuthURL();
  return {
    props: { googleuri }, // will be passed to the page component as props
  };
}
