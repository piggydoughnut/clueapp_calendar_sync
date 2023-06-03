import { CALENDAR_NAME, googleCalendarConfig } from "../defines";
import {
  CyclePhaseDates,
  GoogleCalendarCreateEvent,
  PhaseInfo,
  Resource,
} from "@helpers/types";
import { calendar_v3, google } from "googleapis";
import { getOauth2Client, setClientCredentials } from "./oauthClient";

import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import dayjs from "dayjs";
import { getCyclePhaseDates } from "../cycleLengths";
import { getUser } from "../database";

export const createGoogleCalendar = async (jwt: string) =>
  axios.post("/api/google/calendar", {}, { headers: { Authorization: jwt } });

export const getCalendarApi = async (
  client: OAuth2Client
): Promise<calendar_v3.Calendar> =>
  google.calendar({
    version: "v3",
    auth: client,
  });

export const getCalendar = async (api: calendar_v3.Calendar, id: string) => {
  const exists = await api.calendars.get({
    calendarId: id,
  });
  console.log("The calendar already exists with id: ", exists.data.id);
  return exists;
};

export const createCalendar = async (api: calendar_v3.Calendar) => {
  const newCal = await api.calendars.insert({
    requestBody: {
      summary: CALENDAR_NAME,
    },
  });
  console.log("Created a new calendar with ID: ", newCal.data.id);
  return newCal;
};

export const getScheduledEvents = async (
  api: calendar_v3.Calendar,
  id: string
) =>
  api.events.list({
    calendarId: id,
    timeMin: dayjs().subtract(1, "month").toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

export const createEvent = async (api: calendar_v3.Calendar, event: any) =>
  api.events.insert(event);

export const removeEvent = async (
  api: calendar_v3.Calendar,
  id: string,
  eventId: string | string[]
) =>
  //@ts-ignore
  api.events.delete({
    calendarId: id,
    eventId,
  });

export const getCalendarForUser = async (userEmail: string | null) => {
  try {
    const oauth2Client = getOauth2Client();
    const user = await getUser({
      email: userEmail,
    });
    if (!user) {
      console.error("The user does not exist: ", userEmail);
      return null;
    }
    setClientCredentials(oauth2Client, {
      refreshToken: user?.refreshToken,
      accessToken: user?.accessToken,
      idToken: user?.idToken,
      scope: user?.scope,
    });

    const calendarApi = await google.calendar({
      version: "v3",
      auth: oauth2Client,
    });
    if (!user.calendarId) {
      console.log("The calendar DOES NOT exist. Create new one");
      const newCal = await createCalendar(calendarApi);
      return newCal.data.id;
    } else {
      return user.calendarId;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getCycleEventsForCalendar = (calendarId: string) => {
  if (!calendarId) {
    return;
  }
  let events: GoogleCalendarCreateEvent[] = [];

  const start = "2023-06-01";
  const periodLength = "5";
  const cycleLength = "27";
  const cyclePhaseDates = getCyclePhaseDates(
    start,
    Number(periodLength),
    Number(cycleLength)
  );
  for (let i in cyclePhaseDates) {
    events.push({
      calendarId: calendarId,
      resource: formatEvent(googleCalendarConfig[i], cyclePhaseDates[i]),
    });
  }
  return events;
};

export const createEvents = async (events, user) => {
  const oauth2Client = getOauth2Client();
  setClientCredentials(oauth2Client, {
    refreshToken: user?.refreshToken,
    accessToken: user?.accessToken,
    idToken: user?.idToken,
    scope: user?.scope,
  });
  const calendarApi = await google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  return await Promise.all(
    events.map((event, idx) => {
      // @todo save calendarEvents Ids to check for later
      return setTimeout(() => calendarApi.events.insert(event), 1000 * idx);
    })
  );
};

export const formatEvent = (conf: Resource, phase: PhaseInfo) => ({
  ...conf,
  start: {
    date: phase.startDate,
  },
  end: {
    date: phase.endDate,
  },
});

export const scheduleEvents = async (
  api: calendar_v3.Calendar,
  calendarId: string,
  cyclePhaseDates: CyclePhaseDates
) => {
  let events: any = [];

  for (let i in cyclePhaseDates) {
    events.push({
      calendarId,
      resource: formatEvent(googleCalendarConfig[i], cyclePhaseDates[i]),
    });
  }

  // prepare events for inserting Clue calendar events
  await Promise.all(
    events.map((event: GoogleCalendarCreateEvent, idx: number) => {
      console.log(
        `Adding event ${event.resource.summary} starting ${event.resource.start}`
      );
      return setTimeout(() => createEvent(api, event), 10000 * idx);
    })
  );
};

export const removeMultipleEvents = (
  api: calendar_v3.Calendar,
  calendarId: string,
  eventIds: string[]
) =>
  Promise.all(
    eventIds.map((id, idx) =>
      setTimeout(() => removeEvent(api, calendarId, id), 1000 * idx)
    )
  );
