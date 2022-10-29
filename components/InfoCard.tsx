import {
  DefaultMonthlyEventItem,
  MonthlyBody,
  MonthlyCalendar,
  MonthlyDay,
  MonthlyNav,
} from "@zach.codes/react-calendar";
import { addDays, format, startOfMonth } from "date-fns";

import CalendarDay from "./CalendarDay";
import { CalendarEvent } from "./CalendarEvent";
import { Radio } from "@material-tailwind/react";
import { getDateFormat } from "../helpers";
import { useState } from "react";

const InfoCard = ({ data }: { data: any }) => {
  let [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  const periodLength = data.phases[0].length;
  const periodEnd = addDays(new Date(data.start), periodLength);
  return (
    <div className="flex flex-col">
      <h2 className="text-md">Next predicted cycle</h2>
      <div>
        <p>Starts {getDateFormat(data.start)}</p>
        <p>Ends {getDateFormat(data.end)}</p>
      </div>
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody
          events={[
            {
              title: "Period Starts",
              date: new Date(data.start),
              type: "period",
            },
            { title: "Period End", date: periodEnd, type: "period" },
          ]}
        >
          <CalendarDay
            renderDay={(data) =>
              data.map((item, index) => (
                <CalendarEvent
                  key={index}
                  date={format(item.date, "k:mm")}
                  title={item.title}
                />
              ))
            }
          />
        </MonthlyBody>
      </MonthlyCalendar>
      <p>Remind me to take it easy: </p>
      <div className="flex flex-row align-middle">
        <Radio
          id="reminder1"
          label="3 days before period + 3 days into period"
        />
      </div>
      <div className="flex flex-row">
        <Radio
          id="reminder2"
          label="5 days before period + 4 days into period"
        />
      </div>
    </div>
  );
};

export default InfoCard;
