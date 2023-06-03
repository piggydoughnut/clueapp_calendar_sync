export const CALENDAR_NAME = "My cycle";

export const Phases = {
  DREAM: "Dream",
  DO: "Do",
  GIVE: "Give",
  TAKE: "Take",
};

export const cyclePhaseColors = {
  [Phases.DREAM]: "bg-red-100",
  [Phases.DO]: "bg-teal-200",
  [Phases.TAKE]: "bg-indigo-200",
  [Phases.GIVE]: "bg-yellow-100",
};

export const googleCalendarConfig = {
  [Phases.DREAM]: {
    summary: `${Phases.DREAM} - slowest time of the month`,
    description: Phases.DREAM,
    colorId: "4",
    start: {},
    end: {},
  },
  [Phases.DO]: {
    summary: `${Phases.DO} - ready to tackle the world`,
    description: Phases.DO,
    colorId: "10",
    start: {},
    end: {},
  },
  [Phases.GIVE]: {
    summary: `${Phases.GIVE} - highest energy`,
    description: Phases.GIVE,
    colorId: "1",
    start: {},
    end: {},
  },
  [Phases.TAKE]: {
    summary: `${Phases.TAKE} - start slowing down`,
    description: Phases.TAKE,
    colorId: "5",
    start: {},
    end: {},
  },
};

export const SignupSteps = {
  GOOGLE: 1,
  CLUE: 2,
  PAYMENT: 3,
  FINISH: 4,
};

export const SignupStepsTitle = {
  [SignupSteps.GOOGLE]: "STEP 1 - GOOGLE CALENDAR PERMISSION",
  [SignupSteps.CLUE]: "STEP 2 - CLUE LOGIN DETAILS",
  [SignupSteps.FINISH]: "CONGRATULATIONS!",
} as const;

export const emails = {
  team: "team@hack-your-cycle.com",
};
