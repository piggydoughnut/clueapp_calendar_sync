import { format, getDaysInMonth } from "date-fns";
import { useMonthlyBody, useMonthlyCalendar } from "@zach.codes/react-calendar";

type MonthlyDayProps = {
  renderDay: (events: any[]) => ReactNode;
};
const CalendarDay = ({ renderDay }: MonthlyDayProps) => {
  let { currentMonth, onCurrentMonthChange } = useMonthlyCalendar();
  let { locale } = useMonthlyCalendar();
  let { day, events } = useMonthlyBody();
  let dayNumber = format(day, "d", { locale });
  console.log("day ", day);
  console.log("dayNumber ", dayNumber);
  console.log("day in month", getDaysInMonth(day));

  const isPeriod = events.length > 0 && events.find((e) => e.type === "period");
  const isChill = events.length > 0 && events.find((e) => e.type === "chill");
  console.log(events);

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
