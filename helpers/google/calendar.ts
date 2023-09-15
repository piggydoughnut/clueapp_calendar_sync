import { CyclePhaseDates } from "@helpers/types";

export const filterOutAlreadyScheduledEvents = (
  newEvents: CyclePhaseDates,
  googleEvents: any
) => {
  if (!googleEvents) {
    return newEvents;
  }
  return Object.entries(newEvents)
    .filter(
      ([eventName, eventDates]) =>
        !googleEvents.some(
          (googleEvent: any) =>
            googleEvent.event.start === eventDates.startDate &&
            googleEvent.event.end === eventDates.endDate
        )
    )
    .reduce((obj, [eventName, eventDates]) => {
      // @ts-ignore
      obj[eventName] = eventDates;
      return obj;
    }, {});
};
