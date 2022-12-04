import { Button, Input } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";

import Calendar from "../components/calendar/Calendar";
import ClueLogin from "../components/ClueLogin";
import FormSchema from "../helpers/FormSchema";
import Image from "next/image";
import InputToolTip from "../components/InputTooltip";
import Layout from "../components/Layout";
import Note from "../components/Note";
import PeriodTrackerSupportForm from "../components/PeriodTrackerSupportForm";
import PricingOptions from "../components/PricingOptions";
import axios from "axios";
import cal from "../public/calendar-icon.svg";
import eq from "../public/eq.svg";
import { getCalendarData } from "../helpers/calendar";
import heart from "../public/heart-pulse.svg";
import plus from "../public/plus.svg";
import { toPng } from "html-to-image";

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
  const ref = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const prepareCalendar = (start, length, lengthCycle) => {
    setPeriodStartDate(start);
    const events = getCalendarData(start, length, lengthCycle);
    setCalEvents(events);
    setShowCalendar(true);
  };

  const processClueData = (data) => {
    const periodLength = data.phases[0].length;
    const cycleLength = data.length;
    prepareCalendar(data.start, periodLength, cycleLength);
    setshowClueLogin(false);
    setLoggedInWithClue(true);
  };

  const sendCalendar = async () => {
    if (ref.current === null) {
      return;
    }
    setSendingEmail(true);
    function filter(node) {
      const exclusionClasses = ["not-for-email"];
      return !exclusionClasses.some((classname) =>
        node.className?.includes(classname)
      );
    }
    toPng(ref.current, {
      filter: filter,
      cacheBust: true,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "0px",
        backgroundColor: "white",
        justifyItems: "flex-start",
        alignItems: "flex-start",
        paddingTop: "4px",
        paddingLeft: "12px",
      },
    })
      .then((dataUrl) =>
        axios.post("/api/calendars", {
          screenshot: dataUrl,
          userEmail: userEmail,
        })
      )
      .then((res) => {
        setSendingEmail(false);
        setUserEmail("");
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="text-lg md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[2rem] pb-[2rem]">
          Sync with your cycle.
        </h1>
        <div
          className={`drop-shadow-md border pt-8 pb-8 pl-4 sm:pl-20 pr-4 sm:pr-20 mx-auto bg-white w-full md:w-[480px] ${
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
            <div className="flex flex-col gap-8 justify-center items-center">
              <div className="flex flex-col gap-2">
                <div className="" />
                <Title title="Your personal calendar" />
                <div className="mt-8" />
                <Calendar
                  reff={ref}
                  id="mycustomcalendar"
                  startDate={periodStartDate}
                  events={calEvents}
                />
              </div>
              <div className="flex flex-col justify-center align-centre gap-2 w-full sm:w-[360px] pb-10 h-[180px]">
                {!sendingEmail ? (
                  <>
                    <h2 className="font-bold mb-2 mt-4">
                      Email yourself your personalized calendar 🤓
                    </h2>
                    <Input
                      value={userEmail}
                      type={"email"}
                      onChange={(e) => setUserEmail(e.target.value)}
                      label="your email"
                    ></Input>
                    <Button
                      className="bg-secondaryButton w-full h-11 capitalize"
                      color={"indigo"}
                      onClick={() => sendCalendar()}
                    >
                      Send me my Calendar
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <p>Email sent ✅</p>
                    {/* <Loading /> */}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {showCalendar && (
          <div>
            <h2 className="text-lg font-bold text-center mt-24 mb-24">
              Use the newly found power to balance your life and hack your cycle
            </h2>

            <div className="flex flex-col items-center sm:items-even md:flex-row gap-6">
              <div className="flex flex-row justify-start items-start gap-2 border-white border-2 rounded p-4 ">
                <Image src={heart} width={32} height={32} alt="heart" />
                <div>
                  <p className="uppercase  font-bold">Your cycle data</p>
                  <p className="text-sm">
                    Data on which days you
                    <ul className="list-disc list-inside">
                      <li>need to take it slow</li>
                      <li>can put some extra work in</li>
                      <li>need to take extra care of yourself</li>
                      <li>can be impatient</li>
                      <li>not ready for social interaction</li>
                    </ul>
                  </p>
                </div>
              </div>

              <Image src={plus} width={32} height={32} alt="plus" />
              <div className="flex flex-row justify-start items-start gap-2 border-white border-2 rounded p-4 ">
                <Image src={cal} width={32} height={32} alt="calendar" />
                <div>
                  <p className="uppercase font-bold">Your Google Calendar</p>
                  <p className="text-sm">
                    Space where you
                    <ul className="list-disc list-inside">
                      <li>plan your work mettings</li>
                      <li>schedule dates</li>
                      <li>add reminders for events to attend</li>
                      <li>receive call invitations</li>
                      <li>create travel plans</li>
                    </ul>
                  </p>
                </div>
              </div>

              <Image src={eq} width={32} height={32} alt="eq" />
              <div className="flex flex-row justify-start items-start gap-2 border-secondaryButton border-2 rounded p-4 ">
                <div>
                  <p className="uppercase font-bold text-secondaryButton">
                    Balance
                  </p>
                  <p className="text-sm">
                    <ul className="list-disc list-inside">
                      <li>You know when to schedule busy days.</li>
                      <li>You know when to take it slow.</li>
                      <li>You are in tune with yourself.</li>
                      <li>You are less stressed.</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
            <h2 className="text-lg font-bold text-center mt-24 mb-12">
              Sign up to have your google calendar synced with your cycle.
            </h2>
            <PricingOptions />
            <PeriodTrackerSupportForm />
          </div>
        )}
      </div>
    </Layout>
  );
}
