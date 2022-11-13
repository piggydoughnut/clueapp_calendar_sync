import { Form, Formik } from "formik";
import { MonthlyCalendar, MonthlyNav } from "./MonthlyCalendar";
import { Phases, cyclePhaseColors } from "../../helpers/defines";

import CalendarDay from "./CalendarDay";
import LegendItem from "./LegendItem";
import { MonthlyBody } from "./MonthlyBody";
import { startOfMonth } from "date-fns";
import { useState } from "react";

export default function Calendar({
  startDate,
  showLegend = true,
  events,
  id,
}: {
  startDate?: string;
  showLegend?: boolean;
  events: any;
  id: string;
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
        <MonthlyNav />
        <MonthlyBody events={monthEvents.filter((e) => e.on)}>
          <CalendarDay />
        </MonthlyBody>
      </MonthlyCalendar>
      {showLegend && (
        <div className="flex flex-col gap-2 mt-8 mb-8">
          {/* <p>Feel free to uncheck the values that are not of interest</p> */}
          {Object.values(Phases).map((item) => (
            <LegendItem
              key={item}
              title={item}
              color={cyclePhaseColors[item]}
              on={switches[item]}
              onChecked={() => filterEvents(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
