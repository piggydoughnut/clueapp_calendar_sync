import { calendar_v3 } from "googleapis";

export const PhaseName = {
  DREAM: "Dream",
  DO: "Do",
  GIVE: "Give",
  TAKE: "Take",
} as const;

export type PhaseInfo = {
  startDate: string;
  endDate: string;
};

export type CyclePhaseDates = Record<
  typeof PhaseName[keyof typeof PhaseName],
  PhaseInfo
> & {
  [key: string]: PhaseInfo;
};

export type CalendarDatesType = PhaseInfo & { id: string };

export interface CalendarEvent extends calendar_v3.Schema$Event {
  description?: string | null;
  start?: calendar_v3.Schema$EventDateTime;
  end?: calendar_v3.Schema$EventDateTime;
  id?: string | undefined;
}
