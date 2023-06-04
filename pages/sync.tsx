import { Button, Input } from "@material-tailwind/react";
import { EventType, getCalendarData } from "@helpers/calendar";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";

import Benefits from "@components/Benefits";
import Calendar from "@components/calendar/Calendar";
import FormSchema from "@helpers/FormSchema";
import InputToolTip from "@components/InputTooltip";
import Layout from "@components/nav/Layout";
import Note from "@components/Note";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const Title = ({ title }: { title: string }) => (
  <h2 className="uppercase text-sm font-bold text-center">{title}</h2>
);

const initialValues = {
  periodLength: 0,
  cycleLength: 0,
  start: dayjs(),
};

export default function Sync() {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [periodStartDate, setPeriodStartDate] = useState<string>("");
  const [calEvents, setCalEvents] = useState<EventType[]>([]);
  const [params, setParams] = useState(initialValues);
  const ref = useRef<HTMLDivElement>(null);
  const [userEmail, setUserEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);

  const router = useRouter();

  const prepareCalendar = (
    start: string,
    length: number,
    lengthCycle: number
  ) => {
    setPeriodStartDate(start);
    const events = getCalendarData(start, length, lengthCycle);
    setCalEvents(events);
    setShowCalendar(true);
  };

  const sendCalendar = async () => {
    if (ref.current === null) {
      return;
    }
    setSendingEmail(true);
    function filter(node: any) {
      const exclusionClasses = ["not-for-email"];
      return !exclusionClasses.some((classname) =>
        node.className?.includes(classname)
      );
    }
    // Dynamically load libraries
    const htmlToImage = await import("html-to-image");

    htmlToImage
      .toPng(ref.current, {
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
        axios.post("/api/emails/calendars", {
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

  const Subtitle = ({ text }: { text: string }) => (
    <h2 className="text-lg font-bold text-center mt-24 mb-24 mx-6 sm:mx-0">
      {text}
    </h2>
  );

  return (
    <Layout title="Hack The Cycle: Calendar Sync">
      <div className="flex flex-col items-center">
        <h1 className="text-lg md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[2rem] pb-[2rem]">
          Sync with your cycle
        </h1>
        <div
          className={`drop-shadow-md border pt-8 pb-8 pl-4 pr-4 sm:pl-20 sm:pr-20 mx-auto bg-white w-full sm:w-auto transition-width duration-1000 ease z-1`}
        >
          {showCalendar && (
            <a
              onClick={() => {
                setShowCalendar(false);
              }}
              className="text-tiny opacity-50 font-bold absolute left-8 hover:cursor-pointer transition-all hover:opacity-40"
            >
              BACK
            </a>
          )}
          {!showCalendar ? (
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
                    localStorage.setItem("start", vs.start.toString());
                    localStorage.setItem(
                      "periodLength",
                      vs.periodLength.toString()
                    );
                    localStorage.setItem(
                      "cycleLength",
                      vs.cycleLength.toString()
                    );
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
                    <Button
                      className="bg-secondaryButton w-full h-11 capitalize"
                      color={"indigo"}
                      onClick={() => router.push("/google-sync")}
                    >
                      Sync with my Google Calendar
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
            <Subtitle text="Use the newly found power to balance your life and hack your cycle" />
            <Benefits />
            {/* <Subtitle text="Sign up to have your google calendar synced with your cycle." /> */}
            {/* <PricingOptions /> */}
            {/* <PeriodTrackerSupportForm /> */}
          </div>
        )}
      </div>
    </Layout>
  );
}
