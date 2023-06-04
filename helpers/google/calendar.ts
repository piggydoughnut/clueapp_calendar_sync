import { CALENDAR_NAME, googleCalendarConfig } from "../defines";
import {
  CyclePhaseDates,
  GoogleCalendarCreateEvent,
  PhaseInfo,
  Resource,
} from "@helpers/types";
import { calendar_v3, google } from "googleapis";

import { GoogleCalendarSingleton } from "./calendarApi";
import { OAuth2Client } from "google-auth-library";
import { User } from "@db/models/types";
import dayjs from "dayjs";
import { getUser } from "../database";

export const getApi = (user: User) => {
  const credentials = {
    refreshToken: user?.refreshToken,
    accessToken: user?.accessToken,
    idToken: user?.idToken,
    scope: user?.scope,
  };
  return GoogleCalendarSingleton.getInstance(credentials);
};

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

export const getScheduledEvents = async (calendarId: string, user: User) =>
  getApi(user).getScheduledEvents(calendarId);

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
    const user = await getUser({
      email: userEmail,
    });
    if (!user) {
      console.error("The user does not exist: ", userEmail);
      return null;
    }
    if (!user.calendarId) {
      console.log("The calendar DOES NOT exist. Create new one");
      const apiInstance = getApi(user);
      const newCal = await apiInstance.createCalendar();
      return newCal.data.id;
    }
    return user.calendarId;
  } catch (e) {
    console.log(e);
  }
};

export const createEvents = async (events, user: User, calendarId) =>
  getApi(user).scheduleEvents(calendarId ?? "", events);

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

export const filterOutAlreadyScheduledEvents = (newEvents, googleEvents) => {
  if (!googleEvents) {
    return newEvents;
  }
  return Object.entries(newEvents)
    .filter(
      ([eventName, eventDates]) =>
        !googleEvents.some(
          (googleEvent) =>
            googleEvent.event.start === eventDates.startDate &&
            googleEvent.event.end === eventDates.endDate
        )
    )
    .reduce((obj, [eventName, eventDates]) => {
      obj[eventName] = eventDates;
      return obj;
    }, {});
};
