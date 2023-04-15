import { CyclePhaseDates, PhaseInfo, PhaseName } from "./types";
import { addDays, format, parseISO } from "date-fns";

import { Phases } from "./defines";

export const getLengthsByCycle = (
  periodLength: number,
  cycleLength: number = 28
) => ({
  [Phases.DREAM]: periodLength ? periodLength : 5,
  [Phases.DO]: cycleLength - 15 - periodLength,
  [Phases.GIVE]: 7,
  [Phases.TAKE]: 8,
});

export const formatDate = (d) => format(d, "yyyy-MM-dd");

export const getCyclePhaseDates = (
  cycleStart: string,
  periodLength: number,
  cycleLength: number
): CyclePhaseDates => {
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
    [PhaseName.TAKE]: {
      startDate: formatDate(takePhase.startDate),
      endDate: formatDate(takePhase.endDate),
    },
    [PhaseName.GIVE]: {
      startDate: formatDate(givePhase.startDate),
      endDate: formatDate(givePhase.endDate),
    },
    [PhaseName.DO]: {
      startDate: formatDate(doPhase.startDate),
      endDate: formatDate(doPhase.endDate),
    },
    [PhaseName.DREAM]: {
      startDate: formatDate(dreamPhase.startDate),
      endDate: formatDate(dreamPhase.endDate),
    },
  };
};
