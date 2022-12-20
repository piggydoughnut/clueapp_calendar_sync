import { addDays, format, parseISO } from "date-fns";

import { Phases } from "./defines";

export const getLengthsByCycle = (periodLength, cycleLength = 28) => ({
  [Phases.DREAM]: periodLength ? periodLength : 5,
  [Phases.DO]: cycleLength - 15 - periodLength,
  [Phases.GIVE]: 7,
  [Phases.TAKE]: 8,
});

export const formatDate = (d) => format(d, "yyyy-MM-dd");

export const getCyclePhaseDates = (cycleStart, periodLength, cycleLength) => {
  console.log("cycleStart ", cycleStart);
  console.log("periodLength ", periodLength);
  console.log("cycleLength ", cycleLength);
  const cycleLengths = getLengthsByCycle(periodLength, cycleLength);
  console.log(cycleLengths);

  const dreamEndDate = addDays(
    parseISO(cycleStart),
    cycleLengths[Phases.DREAM]
  );
  const dreamPhase = {
    startDate: parseISO(cycleStart),
    endDate: dreamEndDate,
  };
  const doEndDate = addDays(dreamEndDate, cycleLengths[Phases.DO]);
  const doPhase = {
    startDate: dreamEndDate,
    endDate: doEndDate,
  };

  const giveEndDate = addDays(doEndDate, cycleLengths[Phases.GIVE]);
  const givePhase = {
    startDate: doEndDate,
    endDate: giveEndDate,
  };
  const takeEndDate = addDays(giveEndDate, cycleLengths[Phases.TAKE]);
  const takePhase = {
    startDate: giveEndDate,
    endDate: takeEndDate,
  };

  return {
    [Phases.TAKE]: {
      startDate: formatDate(takePhase.startDate),
      endDate: formatDate(takePhase.endDate),
    },
    [Phases.GIVE]: {
      startDate: formatDate(givePhase.startDate),
      endDate: formatDate(givePhase.endDate),
    },
    [Phases.DO]: {
      startDate: formatDate(doPhase.startDate),
      endDate: formatDate(doPhase.endDate),
    },
    [Phases.DREAM]: {
      startDate: formatDate(dreamPhase.startDate),
      endDate: formatDate(dreamPhase.endDate),
    },
  };
};
