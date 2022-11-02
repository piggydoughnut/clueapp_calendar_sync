import { isChill, isPeriod } from "../helpers/calendar";

import { format } from "date-fns";
import { useMonthlyBody } from "./MonthlyBody";
import { useMonthlyCalendar } from "./MonthlyCalendar";

const CalendarDay = () => {
  let { locale } = useMonthlyCalendar();
  let { day, events } = useMonthlyBody();
  let dayNumber = format(day, "d", { locale });
  return (
    <div
      className={`p-1 w-8 flex justify-center rounded-3xl ${
        isPeriod(events) ? "bg-red-200 " : isChill(events) ? "bg-red-100 " : ""
      }`}
    >
      <div>{dayNumber}</div>
    </div>
  );
};

export default CalendarDay;
