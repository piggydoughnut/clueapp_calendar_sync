import { format, getDaysInMonth } from "date-fns";
import { useMonthlyBody, useMonthlyCalendar } from "@zach.codes/react-calendar";

import { ReactNode } from "react";

type MonthlyDayProps = {
  renderDay: (events: any[]) => ReactNode;
};
const CalendarDay = ({ renderDay }: MonthlyDayProps) => {
  let { currentMonth, onCurrentMonthChange } = useMonthlyCalendar();
  let { locale } = useMonthlyCalendar();
  let { day, events } = useMonthlyBody();
  let dayNumber = format(day, "d", { locale });
  const isPeriod =
    events.length > 0 && events.find((e: any) => e.type === "period");
  const isChill =
    events.length > 0 && events.find((e: any) => e.type === "chill");

  return (
    <div
      aria-label={`Events for day ${dayNumber}`}
      className={`border border-b-2 border-r-2 h-16 p-2 ${
        isPeriod ? "bg-red-200" : isChill ? "bg-red-100" : ""
      }`}
    >
      <div className="flex justify-between">
        <div className="font-bold">{dayNumber}</div>
        <div className="lg:hidden block">{format(day, "EEEE", { locale })}</div>
      </div>
      <ul className="divide-gray-200 divide-y overflow-hidden max-h-36 overflow-y-auto">
        {renderDay(events)}
      </ul>
    </div>
  );
};

export default CalendarDay;
