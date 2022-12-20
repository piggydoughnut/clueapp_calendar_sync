import { addDays, subDays } from "date-fns";
import { getCyclePhaseDates, getLengthsByCycle } from "./cycleLengths";

import { Phases } from "./defines";

export const isGive = (events) => isType(events, Phases.GIVE);
export const isTake = (events) => isType(events, Phases.TAKE);
export const isDream = (events) => isType(events, Phases.DREAM);
export const isDo = (events) => isType(events, Phases.DO);

export const isType = (events: Array<any>, typeName: string) =>
  events.length > 0 ? events[0].type === typeName : false;

export type EventType = {
  date: string;
  type: string;
  on: boolean;
};

export const getCalendarData = (
  start: string,
  length: number,
  cycleLength: number
): Array<EventType> => {
  const events = [];
  const cycleLengths = getLengthsByCycle(length, cycleLength);
  for (let i = 1; i < cycleLengths[Phases.TAKE]; i++) {
    events.push({
      date: subDays(new Date(start), i),
      type: Phases.TAKE,
      on: true,
    });
  }

  const previousGivePhaseEnd = subDays(
    new Date(start),
    cycleLengths[Phases.TAKE]
  );
  for (let i = 0; i < cycleLengths[Phases.GIVE]; i++) {
    events.push({
      date: subDays(previousGivePhaseEnd, i),
      type: Phases.GIVE,
      on: true,
    });
  }

  const previousDoPhase = subDays(
    previousGivePhaseEnd,
    cycleLengths[Phases.GIVE]
  );
  for (let i = 0; i < cycleLengths[Phases.DO]; i++) {
    events.push({
      date: subDays(previousDoPhase, i),
      type: Phases.DO,
      on: true,
    });
  }

  for (let i = 0; i < length; i++) {
    events.push({
      date: addDays(new Date(start), i),
      type: Phases.DREAM,
      on: true,
    });
  }
  const doStart = addDays(new Date(start), length);
  for (let i = 0; i < cycleLengths[Phases.DO]; i++) {
    events.push({
      date: addDays(doStart, i),
      type: Phases.DO,
      on: true,
    });
  }

  const giveStart = addDays(doStart, cycleLengths[Phases.DO]);
  for (let i = 0; i < cycleLengths[Phases.GIVE]; i++) {
    events.push({
      date: addDays(giveStart, i),
      type: Phases.GIVE,
      on: true,
    });
  }
  return events;
};

export const getGoogleCalendarData = (
  start: string,
  length: number,
  cycleLength: number
): Array<EventType> => {
  const events = [];
  const cycleLengths = getLengthsByCycle(length, cycleLength);
  const cyclePhaseDates = getCyclePhaseDates(start, length, cycleLength);

  return events;
};
