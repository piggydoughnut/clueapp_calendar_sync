import { Locale, format, getDay, isSameDay } from "date-fns";
import React, { ReactNode, useContext } from "react";
import { enUS, he } from "date-fns/locale";

import { useMonthlyCalendar } from "./MonthlyCalendar";

type DaysInWeekProps = {
  locale?: Locale;
};
export const daysInWeek = ({ locale = enUS }: DaysInWeekProps) => [
  { day: 0, label: locale.localize?.day(0) },
  { day: 1, label: locale.localize?.day(1) },
  { day: 2, label: locale.localize?.day(2) },
  { day: 3, label: locale.localize?.day(3) },
  { day: 4, label: locale.localize?.day(4) },
  { day: 5, label: locale.localize?.day(5) },
  { day: 6, label: locale.localize?.day(6) },
];
const MonthlyBodyContext = React.createContext({} as any);
type BodyState<DayData> = {
  day: Date;
  events: DayData[];
};

export function useMonthlyBody<DayData>() {
  return useContext<BodyState<DayData>>(MonthlyBodyContext);
}

type OmittedDaysProps = {
  days: Date[];
  omitDays?: number[];
  locale?: Locale;
};

export const handleOmittedDays = ({
  days,
  omitDays,
  locale,
}: OmittedDaysProps) => {
  let headings = daysInWeek({ locale });
  console.log(enUS.localize.day(0, {}));
  console.log("hh ", headings);
  let daysToRender = days;

  //omit the headings and days of the week that were passed in
  if (omitDays) {
    headings = daysInWeek({ locale }).filter(
      (day) => !omitDays.includes(day.day)
    );
    daysToRender = days.filter((day) => !omitDays.includes(getDay(day)));
  }

  // omit the padding if an omitted day was before the start of the month
  let firstDayOfMonth = getDay(daysToRender[0]) as number;
  if (omitDays) {
    let subtractOmittedDays = omitDays.filter(
      (day) => day < firstDayOfMonth
    ).length;
    firstDayOfMonth = firstDayOfMonth - subtractOmittedDays;
  }
  let padding = new Array(firstDayOfMonth).fill(0);
  console.log("padding ", padding);
  console.log("daysToRender ", daysToRender);

  return { headings, daysToRender, padding };
};

//to prevent these from being purged in production, we make a lookup object
const headingClasses = {
  l3: "lg:grid-cols-3",
  l4: "lg:grid-cols-4",
  l5: "lg:grid-cols-5",
  l6: "lg:grid-cols-6",
  l7: "lg:grid-cols-7",
};

type MonthlyBodyProps<DayData> = {
  /*
    skip days, an array of days, starts at sunday (0), saturday is 6
    ex: [0,6] would remove sunday and saturday from rendering
  */
  omitDays?: number[];
  events: (DayData & { date: Date })[];
  children: ReactNode;
};

const weekDays = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};
export function MonthlyBody<DayData>({
  omitDays,
  events,
  children,
}: MonthlyBodyProps<DayData>) {
  let { days, locale } = useMonthlyCalendar();
  let { headings, daysToRender, padding } = handleOmittedDays({
    days,
    omitDays,
    locale,
  });

  let headingClassName =
    "p-2 lg:block hidden uppercase opacity-70 font-bold text-tiny";
  return (
    <div className="bg-white p-l-2 ">
      <div className={`grid grid-cols-7 w-96`}>
        {headings.map((day) => (
          <div
            key={day.day}
            className={headingClassName}
            aria-label="Day of Week"
          >
            {weekDays[day.label]}
          </div>
        ))}
        {padding.map((_, index) => (
          <div
            key={index}
            className={headingClassName}
            aria-label="Empty Day"
          />
        ))}
        {daysToRender.map((day) => (
          <MonthlyBodyContext.Provider
            key={day.toISOString()}
            value={{
              day,
              events: events.filter((data) => isSameDay(data.date, day)),
            }}
          >
            {children}
          </MonthlyBodyContext.Provider>
        ))}
      </div>
    </div>
  );
}

type MonthlyDayProps<DayData> = {
  renderDay: (events: DayData[]) => ReactNode;
};
export function MonthlyDay<DayData>({ renderDay }: MonthlyDayProps<DayData>) {
  let { locale } = useMonthlyCalendar();
  let { day, events } = useMonthlyBody<DayData>();
  let dayNumber = format(day, "d", { locale });

  return (
    <div aria-label={`Events for day ${dayNumber}`} className="h-48 p-2">
      <div className="flex justify-between">
        <div className="font-bold">{dayNumber}</div>
        <div className="lg:hidden block">{format(day, "EEEE", { locale })}</div>
      </div>
      <ul className="divide-gray-200 divide-y overflow-hidden max-h-36 overflow-y-auto">
        {renderDay(events)}
      </ul>
    </div>
  );
}
