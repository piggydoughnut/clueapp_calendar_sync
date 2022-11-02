import { Phases } from "./defines";

export const getLengthsByCycle = (periodLength, cycleLength = 28) => ({
  [Phases.DREAM]: periodLength ? periodLength : 5,
  [Phases.DO]: cycleLength - 15 - periodLength,
  [Phases.GIVE]: 7,
  [Phases.TAKE]: 8,
});
