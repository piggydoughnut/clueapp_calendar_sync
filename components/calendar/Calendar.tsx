import { Form, Formik } from "formik";
import { MonthlyCalendar, MonthlyNav } from "./MonthlyCalendar";
import { Phases, cyclePhaseColors } from "../../helpers/defines";
import { format, getYear, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";

import CalendarDay from "./CalendarDay";
import LegendItem from "./LegendItem";
import { MonthlyBody } from "./MonthlyBody";

const phasesInfo = {
  [Phases.DREAM]: "This is the time to take extra care of yourself",
  [Phases.DO]: "Great time to return back to life.",
  [Phases.GIVE]: "Best time to smash those goals.",
  [Phases.TAKE]: "Slowing down and preparing for hybernation.",
};

export default function Calendar({
  startDate,
  showLegend = true,
  events,
  id,
  emailVersion,
}: {
  startDate?: string;
  showLegend?: boolean;
  events: any;
  id: string;
  emailVersion: boolean;
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date(startDate ?? ""))
  );

  const [explanation, setExplanation] = useState(false);
  const [monthEvents, setMonthEvents] = useState(events);
  const [switches, setSwitches] = useState({
    [Phases.DREAM]: true,
    [Phases.DO]: true,
    [Phases.GIVE]: true,
    [Phases.TAKE]: true,
  });

  useEffect(() => {
    if (emailVersion) {
      setExplanation(true);
    }
  }, [emailVersion]);

  const showItem = (item) => (
    <div key={item}>
      <LegendItem
        title={item}
        color={cyclePhaseColors[item]}
        on={switches[item]}
        onChecked={() => filterEvents(item)}
        emailVersion={emailVersion}
      />
      {explanation && (
        <p className="text-sm ml-12 opacity-60">{phasesInfo[item]}</p>
      )}
    </div>
  );

  const filterEvents = (type) => {
    const filtered = monthEvents.map((event) => {
      if (event.type === type) {
        event.on = !event.on;
      }
      return event;
    });
    setSwitches({ ...switches, [type]: !switches[type] });
    setMonthEvents(filtered);
  };
  return (
    <div
      id={id}
      className={`flex flex-row gap-24 ${emailVersion && "flex-col gap-12"}`}
    >
      <div>
        <MonthlyCalendar
          currentMonth={currentMonth}
          onCurrentMonthChange={(date) => setCurrentMonth(date)}
        >
          {!emailVersion ? (
            <MonthlyNav />
          ) : (
            <div className="mb-6 text-center font-bold uppercase">
              {" "}
              {format(
                currentMonth,
                getYear(currentMonth) === getYear(new Date())
                  ? "LLLL"
                  : "LLLL yyyy"
              )}
            </div>
          )}
          <MonthlyBody events={monthEvents.filter((e) => e.on)}>
            <CalendarDay emailVersion={emailVersion} />
          </MonthlyBody>
        </MonthlyCalendar>
      </div>

      <div>
        {showLegend && (
          <div className="flex flex-col gap-6 mb-8 w-72">
            {!emailVersion && (
                <div
                  className="underline mb-4 cursor-pointer"
                  onClick={() => setExplanation(!explanation)}
                >
                  Explain the cycle phases to me
                </div>
              ) &&
              Object.values(Phases).map((item) => showItem(item))}

            {emailVersion &&
              Object.values(Phases).map(
                (item) => switches[item] && showItem(item)
              )}
          </div>
        )}
      </div>
    </div>
  );
}
