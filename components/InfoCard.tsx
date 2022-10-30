import {
  MonthlyBody,
  MonthlyCalendar,
  MonthlyNav,
} from "@zach.codes/react-calendar";
import { addDays, format, startOfMonth, subDays } from "date-fns";

import CalendarDay from "./CalendarDay";
import { CalendarEvent } from "./CalendarEvent";
import { Radio } from "@material-tailwind/react";
import { getDateFormat } from "../helpers";
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
      <h2 className="text-md">Next predicted cycle</h2>
      <div className="grid grid-rows-3 grid-cols-2 gap-2 w-64 mt-4">
        <p>Starts</p> <div> {getDateFormat(data.start)}</div>
        <p>Ends </p>
        <div>
          {getDateFormat(
            addDays(new Date(data.start), periodLength).toString()
          )}
        </div>
        <p>Length</p>
        <div> {periodLength} days</div>
      </div>
      <p className="mt-4">Remind me to take it easy: </p>
      <div className="flex flex-col">
        <Radio
          id="threedays"
          value="threedays"
          label="3 days before period"
          color="pink"
          checked={selectedOption === "threedays"}
          onChange={() => setSelectedOption("threedays")}
        />
        <Radio
          id="fivedays"
          value="fivedays"
          label="5 days before period"
          color="pink"
          checked={selectedOption === "fivedays"}
          onChange={() => setSelectedOption("fivedays")}
        />
      </div>
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody events={events}>
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
      <a href={googleAuthUrl}>Auth with Google</a>
    </div>
  );
};

// This gets called on every request
export function getStaticProps() {
  console.log("jajaj");
  const googleAuthUrl = getGoogleAuthURL();
  console.log("made it ", googleAuthUrl);
  return { props: { googleAuthUrl } };
}

export default InfoCard;
