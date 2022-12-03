import { EventType } from "../../helpers/calendar";
import { cyclePhaseColors } from "../../helpers/defines";
import { format } from "date-fns";
import { useMonthlyBody } from "./MonthlyBody";
import { useMonthlyCalendar } from "./MonthlyCalendar";

const CalendarDay = () => {
  let { locale } = useMonthlyCalendar();
  let { day, events }: { day: Date; events: Array<EventType> } =
    useMonthlyBody();
  let dayNumber = format(day, "d", { locale });
  let circleColor = events.length > 0 ? cyclePhaseColors[events[0]?.type] : "";
  return (
    <div className="pt-1 pb-1">
      <div className={`${circleColor} p-1 w-8 flex justify-center rounded-3xl`}>
        <p className={`justify-self-center self-center `}>{dayNumber}</p>
      </div>
    </div>
  );
};

export default CalendarDay;
