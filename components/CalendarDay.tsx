import { format, getDaysInMonth } from "date-fns";

import { ReactNode } from "react";
import { useMonthlyBody } from "./MonthlyBody";
import { useMonthlyCalendar } from "./MonthlyCalendar";

type MonthlyDayProps = {
  renderDay?: (events: any[]) => ReactNode;
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
      className={`p-1  rounded-3xl ${
        isPeriod ? "bg-red-200 " : isChill ? "bg-red-100 " : ""
      }`}
    >
      <div className="flex justify-center">
        <div>{dayNumber}</div>
      </div>
      <ul className="divide-gray-200 divide-y overflow-hidden overflow-y-auto">
        {/* {renderDay(events)} */}
      </ul>
    </div>
  );
};

export default CalendarDay;
