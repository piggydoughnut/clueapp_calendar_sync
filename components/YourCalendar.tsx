import { Button, Radio } from "@material-tailwind/react";
import { MonthlyCalendar, MonthlyNav } from "./MonthlyCalendar";
import { addDays, format, startOfMonth, subDays } from "date-fns";

import CalendarDay from "./CalendarDay";
import { CalendarEvent } from "./CalendarEvent";
import { MonthlyBody } from "./MonthlyBody";
import { getDateFormat } from "../helpers";
import { useRouter } from "next/router";
import { useState } from "react";

const InfoCard = ({
  data,
  googleAuthUrl,
}: {
  data: any;
  googleAuthUrl: string;
}) => {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  const router = useRouter();
  const periodLength = data.phases[0].length;
  const periodEnd = addDays(new Date(data.start), periodLength);
  const [selectedOption, setSelectedOption] = useState("threedays");
  const events = [];
  const chillTimeLength = selectedOption === "threedays" ? 4 : 6;
  for (let i = 1; i < chillTimeLength; i++) {
    events.push({
      title: "Chill",
      date: subDays(new Date(data.start), i),
      type: "chill",
    });
  }
  events.push({
    title: "Start",
    date: new Date(data.start),
    type: "period",
  });
  for (let i = 1; i < periodLength; i++) {
    events.push({
      title: "Period",
      date: addDays(new Date(data.start), i),
      type: "period",
    });
  }
  events.push({
    title: "End",
    date: periodEnd,
    type: "period",
  });
  return (
    <div className="flex flex-col">
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody events={events}>
          <CalendarDay />
        </MonthlyBody>
      </MonthlyCalendar>
      <div className="mt-4 mb-10">
        If you want to have chill events to be added to your calendar you will
        need to give us a permission to do so
        <Button onClick={() => router.push(googleAuthUrl)}>
          Auth with Google
        </Button>
      </div>
    </div>
  );
};

export default InfoCard;
