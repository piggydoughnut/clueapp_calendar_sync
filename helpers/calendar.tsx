import { addDays, format, startOfMonth, subDays } from "date-fns";

export const isPeriod = (events) => isType(events, "period");
export const isChill = (events) => isType(events, "chill");
export const isProductive = (events) => isType(events, "productive");
export const isType = (events: Array<any>, typeName: string) =>
  events.length > 0 ? events.find((e: any) => e.type === typeName) : false;

export const getCalendarData = (start: string, length: number) => {
  const events = [];
  const chillTimeLength = 4;
  for (let i = 1; i < chillTimeLength; i++) {
    events.push({
      title: "Chill",
      date: subDays(new Date(start), i),
      type: "chill",
    });
  }
  events.push({
    title: "Start",
    date: new Date(start),
    type: "period",
  });
  for (let i = 1; i < length; i++) {
    events.push({
      title: "Period",
      date: addDays(new Date(start), i),
      type: "period",
    });
  }
  events.push({
    title: "End",
    date: addDays(new Date(start), length),
    type: "period",
  });
  return events;
};
