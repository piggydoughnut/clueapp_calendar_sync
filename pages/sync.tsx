import { Button, Input } from "@material-tailwind/react";

import Calendar from "../components/Calendar";
import Image from "next/image";
import { getCalendarData } from "../helpers/calendar";
import { useState } from "react";

export default function Sync() {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [periodLength, setPeriodLength] = useState<number | null>(0);
  const [cycleLength, setCycleLength] = useState<number | null>(0);
  const [periodStartDate, setPeriodStartDate] = useState<string | null>(null);
  const [calEvents, setCalEvents] = useState([]);

  const prepareCalendar = () => {
    const events = getCalendarData(periodStartDate, periodLength);
    console.log(events);
    setCalEvents(events);
    setShowCalendar(true);
  };

  return (
    <div className="bg-[url('/heart.svg')] bg-no-repeat bg-center h-screen flex flex-col items-center bg-lightPink">
      <h1 className="md:text-md lg:text-xl font-bold text-center pt-[10rem] pb-[2rem]">
        Sync with your cycle.
      </h1>
      <div className="drop-shadow-md border pt-8 pb-8 pl-20 pr-20 mx-auto bg-white">
        {!showCalendar ? (
          <div>
            <h2 className="uppercase text-sm font-bold">
              set yourself up for a balanced month
            </h2>
            <div className="flex flex-col gap-4 pt-8">
              <div>
                <Input
                  title="Next period start date"
                  label="Next period start date"
                  color="purple"
                  type="date"
                  value={periodStartDate}
                  onChange={(e) => setPeriodStartDate(e.target.value)}
                ></Input>
              </div>

              <Input
                title="Approximate period length"
                label="Approximate period length"
                color="purple"
                type="number"
                value={periodLength}
                onChange={(e) => setPeriodLength(Number(e.target.value))}
              ></Input>
              <Input
                title="Approximate cycle length"
                label="Approximate cycle length"
                color="purple"
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
              ></Input>
              <Button
                className="bg-indigo-400 w-full h-11 capitalize"
                onClick={() => prepareCalendar()}
              >
                Show my calendar
              </Button>
              <div className="flex flex-row justify-center items-center gap-4">
                <hr className="w-32"></hr>
                <p className="opacity-40">OR</p>
                <hr className="w-32"></hr>
              </div>
              <div className="text-sm flex flex-col justify-center items-center gap-2">
                <a href="#">
                  <p>GET MY DATA FROM</p>
                  <Image
                    src="/clue.png"
                    width={120}
                    height={40}
                    alt="exteralSource"
                  />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {" "}
            <h2 className="uppercase text-sm font-bold text-center mb-8">
              Your personal calendar
            </h2>
            <Calendar events={calEvents} />
            <div className="flex flex-col gap-4">
              <Button
                className="bg-indigo-400 w-full h-11 capitalize"
                color={"indigo"}
              >
                Email this great info to me
              </Button>
              <Button
                color={"gray"}
                className="bg-transparent text-black border w-full h-11 capitalize"
              >
                Sync with my Google Calendar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
