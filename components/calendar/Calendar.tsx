import { Form, Formik } from "formik";
import { MonthlyCalendar, MonthlyNav } from "./MonthlyCalendar";
import { Phases, cyclePhaseColors } from "../../helpers/defines";
import { format, getYear, startOfMonth } from "date-fns";

import CalendarDay from "./CalendarDay";
import LegendItem from "./LegendItem";
import { MonthlyBody } from "./MonthlyBody";
import { useState } from "react";

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

  const [monthEvents, setMonthEvents] = useState(events);
  const [switches, setSwitches] = useState({
    [Phases.DREAM]: true,
    [Phases.DO]: true,
    [Phases.GIVE]: true,
    [Phases.TAKE]: true,
  });

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
    <div id={id}>
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
      {showLegend && (
        <div className="flex flex-col gap-2 mt-8 mb-8">
          {Object.values(Phases).map((item) => (
            <LegendItem
              key={item}
              title={item}
              color={cyclePhaseColors[item]}
              on={switches[item]}
              onChecked={() => filterEvents(item)}
              emailVersion={emailVersion}
            />
          ))}
        </div>
      )}
    </div>
  );
}
