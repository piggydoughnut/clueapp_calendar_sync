import { Button, Input } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { beginnerReasons, proReasons } from "../data/pricing";
import { useEffect, useState } from "react";

import Calendar from "../components/calendar/Calendar";
import ClueLogin from "../components/ClueLogin";
import FormSchema from "../helpers/FormSchema";
import Image from "next/image";
import InputToolTip from "../components/InputTooltip";
import Layout from "../components/Layout";
import Note from "../components/Note";
import Pricing from "../components/PricingBeginner";
import PricingBeginner from "../components/PricingBeginner";
import { getCalendarData } from "../helpers/calendar";
import { useScreenshot } from "use-react-screenshot";

const Title = ({ title }: { title: string }) => (
  <h2 className="uppercase text-sm font-bold text-center">{title}</h2>
);

const initialValues = {
  periodLength: 0,
  cycleLength: 0,
  start: "",
};

export default function Sync() {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [periodStartDate, setPeriodStartDate] = useState<string>("");
  const [calEvents, setCalEvents] = useState([]);
  const [showClueLogin, setshowClueLogin] = useState(false);
  const [loggedInWithClue, setLoggedInWithClue] = useState(false);
  const [params, setParams] = useState(initialValues);
  const [image, takeScreenshot] = useScreenshot();
  const [emailVersion, setEmailVersion] = useState(false);

  const prepareCalendar = (start, length, lengthCycle) => {
    setPeriodStartDate(start);
    const events = getCalendarData(start, length, lengthCycle);
    setCalEvents(events);
    setShowCalendar(true);
  };

  useEffect(() => {
    if (emailVersion) {
      takeScreenshot(document?.getElementById("mycustomcalendar"));
    }
    setEmailVersion(false);
  }, [emailVersion]);

  const processClueData = (data) => {
    const periodLength = data.phases[0].length;
    const cycleLength = data.length;
    prepareCalendar(data.start, periodLength, cycleLength);
    setshowClueLogin(false);
    setLoggedInWithClue(true);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="md:text-md lg:text-xl font-bold text-center pt-[5rem] pb-[2rem]">
          Sync with your cycle.
        </h1>
        <div
          className={`drop-shadow-md border pt-8 pb-8 pl-20 pr-20 mx-auto bg-white  w-[480px] ${
            showCalendar ? "w-auto" : ""
          } transition-width duration-1000 ease`}
        >
          {(showCalendar || showClueLogin) && (
            <a
              onClick={() => {
                setShowCalendar(false);
                setshowClueLogin(false);
              }}
              className="text-tiny opacity-50 font-bold absolute left-8 hover:cursor-pointer transition-all hover:opacity-40"
            >
              BACK
            </a>
          )}
          {showClueLogin ? (
            <div className="flex flex-col justify-center items-center">
              <Title title="Login to Clue" />
              <ClueLogin setCycleData={(a) => processClueData(a)} />
              <div className="mb-8 text-tiny opacity-60 mt-1">
                <p>DISCLAIMER</p>
                <p>We do not store or collect any of your data</p>
              </div>
            </div>
          ) : !showCalendar ? (
            <div>
              <Title title="set yourself up for a balanced month" />
              <Note note="Enter details about your cycle to get a personalized cycle phase calendar." />
              <div className="flex flex-col gap-4 pt-8">
                <Formik
                  initialValues={params}
                  enableReinitialize
                  validationSchema={FormSchema}
                  onSubmit={async (vs) => {
                    setParams(vs);
                    prepareCalendar(vs.start, vs.periodLength, vs.cycleLength);
                  }}
                >
                  {({ values, errors, handleChange, touched }) => (
                    <Form className="flex flex-col gap-4">
                      <div>
                        <Input
                          id="start"
                          name="start"
                          title="Next period start date"
                          label="Next period start date"
                          type="date"
                          value={values.start}
                          onChange={handleChange}
                          error={Boolean(errors.start)}
                        ></Input>
                        <InputToolTip content="This can be a rough guess in case you are not tracking your cycle." />
                      </div>
                      <div>
                        <Input
                          id="periodLength"
                          name="periodLength"
                          width={20}
                          title="Approximate period length"
                          label="Approximate period length"
                          type="number"
                          value={values.periodLength}
                          onChange={handleChange}
                          error={Boolean(errors.periodLength)}
                        ></Input>
                        <InputToolTip content="Average period lasts 1-7 days" />
                      </div>
                      <div>
                        <Input
                          id="cycleLength"
                          name="cycleLength"
                          title="Approximate cycle length"
                          label="Approximate cycle length"
                          type="number"
                          value={values.cycleLength}
                          onChange={handleChange}
                          error={Boolean(errors.cycleLength)}
                        ></Input>
                        <InputToolTip content="An average cycle is 21-45 days" />
                      </div>

                      <div className="h-4 text-tiny text-red-300 text-center">
                        {Object.values(errors)[0]}
                      </div>
                      <Button
                        type="submit"
                        className="bg-secondaryButton w-full h-11 capitalize"
                      >
                        Show my calendar
                      </Button>
                    </Form>
                  )}
                </Formik>
                <div className="flex flex-row justify-center items-center gap-4">
                  <hr className="w-32"></hr>
                  <p className="opacity-40">OR</p>
                  <hr className="w-32"></hr>
                </div>
                <div className="text-sm flex flex-col justify-center items-center gap-2">
                  <button
                    onClick={() => setshowClueLogin(true)}
                    className="transition-all hover:opacity-80"
                  >
                    <p>GET MY DATA FROM</p>
                    <Image
                      src="/clue.png"
                      width={120}
                      height={40}
                      alt="exteralSource"
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 justify-start items-start h-[500px]">
              <div className="flex flex-col gap-2">
                <Title title="Your personal calendar" />
                <div className="mt-12" />
                <Calendar
                  id="mycustomcalendar"
                  startDate={periodStartDate}
                  events={calEvents}
                  emailVersion={emailVersion}
                />
              </div>
              {/*               
              <div className="flex flex-col gap-4 mt-12 ">
                <h1 className="text-xl">How do I get productive now?</h1>
                <p>
                  You can{" "}
                  <a
                    href="#emailme"
                    className="font-bold text-md underline underline-offset-4 decoration-2 cursor-pointer"
                  >
                    email yourself this personalized calendar
                  </a>{" "}
                  so you can refer to it at your convenience.
                </p>
                <p> or if you want to get extra productive 🤓</p>
                <p>👉🏼 Sync this calendar with your Google Calendar.</p>
              </div> */}
              {/* <div id="emailme" className="flex flex-col gap-4 mt-20 w-[350px]">
                <Title title={"Personalized Cycle Guide"} />
                <p className="text-sm">
                  The calendar above is your personal cycle map. Use it to your
                  full advantage. Now you know which days are good for important
                  meetings and which should be reserved for dialing it back and
                  relaxing.
                </p>
                <Input label="your email"></Input>
                <Button
                  className="bg-secondaryButton w-full h-11 capitalize"
                  color={"indigo"}
                  onClick={() => setEmailVersion(true)}
                >
                  Send me my cycle Guide
                </Button>
              </div> */}
              {/* <div className="flex flex-col gap-4 mt-20 w-[650px]">
                <h1 className="text-2xl">
                  {"🥳 Own your cycle and your calendar🥳"}
                </h1>
                <p className="text-md">
                  The calendar above is your personal cycle map. Use it to your
                  full advantage. Now you know which days are good for important
                  meetings and which should be reserved for dialing it back and
                  relaxing.
                </p>
                <Button className="bg-transparent text-black border w-full h-11 capitalize">
                  Sync with Google Calendar
                </Button>
              </div> */}
            </div>
          )}
        </div>

        {/* <img width={400} src={image} alt={"Screenshot"} /> */}
        {showCalendar && (
          <div>
            <h2 className="text-lg font-bold text-center mt-24 mb-24">
              Use the newly found power to balance your life and hack your cycle
            </h2>
            <div className="flex flex-row gap-12 mt-20">
              <Pricing
                type="Beginner 🤓"
                title="YOUR PERSONALIZED CYCLE CALENDAR"
                price="free"
                reasons={beginnerReasons}
              >
                <div className="flex flex-col gap-2 mt-36 w-[300px]">
                  <Input label="your email"></Input>
                  <Button
                    className="bg-secondaryButton w-full h-11 capitalize"
                    color={"indigo"}
                    // onClick={() => setEmailVersion(true)}
                  >
                    Send me my Calendar
                  </Button>
                </div>
              </Pricing>
              <Pricing
                type="Pro 😎"
                title="always Know the best time to schedule!"
                price="1st sync free + $2.71/mo after"
                reasons={proReasons}
              >
                <div className="flex flex-col gap-2 mt-6 w-[300px]">
                  <div className="flex flex-col justify-center mt-6 mx-auto">
                    <h2 className="uppercase text-tiny opacity-50 mt-2 mb-2 text-center">
                      Supported period trackers
                    </h2>
                    <Image
                      src="/clue.png"
                      width={120}
                      height={40}
                      alt="exteralSource"
                    />
                    <p className="max-w-[400px] text-tiny opacity-70">
                      If you are not using Clue,{" "}
                      <a className="underline hover:opacity-70" href="">
                        please let us know which one you use
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
          </div>
        )}
      </div>
    </Layout>
  );
}
