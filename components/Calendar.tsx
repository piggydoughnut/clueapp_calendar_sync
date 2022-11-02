import { MonthlyCalendar, MonthlyNav } from "./MonthlyCalendar";
import { Phases, cyclePhaseColors } from "../helpers/defines";

import CalendarDay from "./CalendarDay";
import { MonthlyBody } from "./MonthlyBody";
import { startOfMonth } from "date-fns";
import { useState } from "react";

const LegendItem = ({ title, color }: { title: string; color: string }) => (
  <div className="flex gap-2">
    <div className={`${color} h-4 w-4 rounded-3xl`}></div>{" "}
    <p className="text-tiny uppercase">{title}</p>
  </div>
);

export default function Calendar({
  showLegend = true,
  events,
}: {
  showLegend?: boolean;
  events: any;
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  return (
    <div>
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody events={events}>
          <CalendarDay />
        </MonthlyBody>
      </MonthlyCalendar>
      {showLegend && (
        <div className="flex flex-col gap-2 mt-4 mb-6">
          <LegendItem
            title={Phases.DREAM}
            color={cyclePhaseColors[Phases.DREAM]}
          />
          <LegendItem title={Phases.DO} color={cyclePhaseColors[Phases.DO]} />
          <LegendItem
            title={Phases.GIVE}
            color={cyclePhaseColors[Phases.GIVE]}
          />
          <LegendItem
            title={Phases.TAKE}
            color={cyclePhaseColors[Phases.TAKE]}
          />
        </div>
      )}
    </div>
  );
}
