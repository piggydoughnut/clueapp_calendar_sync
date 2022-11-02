import { cyclePhaseColors } from "../helpers/defines";
import { format } from "date-fns";
import { useMonthlyBody } from "./MonthlyBody";
import { useMonthlyCalendar } from "./MonthlyCalendar";

const CalendarDay = () => {
  let { locale } = useMonthlyCalendar();
  let { day, events } = useMonthlyBody();
  let dayNumber = format(day, "d", { locale });
  let circleColor = events.length > 0 ? cyclePhaseColors[events[0].type] : "";
  return (
    <div className="pt-1 pb-1">
      <div className={`p-1 w-8 flex justify-center rounded-3xl ${circleColor}`}>
        {dayNumber}
      </div>
    </div>
  );
};

export default CalendarDay;
