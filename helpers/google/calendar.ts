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
import jwt from "jsonwebtoken";

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

export const createCalendarForUser = async (jwtToken: string | null) => {
  try {
    const oauth2Client = getOauth2Client();

    const decoded = jwt.verify(jwtToken ?? "", process.env.JWT ?? "");
    const u = await getUser({
      email: (decoded as { email: string }).email,
    });

    if (!u) {
      console.error("The user does not exist: ", decoded);
      return;
    }

    setClientCredentials(oauth2Client, {
      refreshToken: u?.refreshToken,
      accessToken: u?.accessToken,
      idToken: u?.idToken,
      scope: u?.scope,
    });

    const calendarApi = await google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    let calendarToEdit: string = "";

    if (!u.calendarId) {
      console.log("The calendar DOES NOT exist. Create new one");
      const newCal = await createCalendar(calendarApi);
      // @ts-ignore
      u.calendarId = newCal.data.id ?? "";
      await u?.save();
      calendarToEdit = newCal.data.id ?? "";
    } else {
      const calendarExists = await getCalendar(calendarApi, u.calendarId);
      calendarToEdit = calendarExists.data.id ?? "";
    }
    // add the events for the given user
    console.log("Editing calendar with id: ", calendarToEdit);
    if (!calendarToEdit) {
      console.error("There is no calendar to edit for user ", u?.id);
      return;
    }

    let events: GoogleCalendarCreateEvent[] = [];
    u?.clue.data.forEach((dataPoint) => {
      if (!dataPoint.completed) {
        const cyclePhaseDates = getCyclePhaseDates(
          dataPoint.start,
          dataPoint.phases[0].length,
          dataPoint.length
        );
        console.log("cyclePhaseDates ", cyclePhaseDates);

        for (let i in cyclePhaseDates) {
          events.push({
            calendarId: calendarToEdit,
            resource: {
              ...googleCalendarConfig[i],
              start: {
                date: cyclePhaseDates[i].startDate,
              },
              end: {
                date: cyclePhaseDates[i].endDate,
              },
            },
          });
        }
      }
    });

    // prepare events for inserting Clue calendar events
    // @todo save calendar event ids and use them when checking for calendar changes
    // const scheduledEvents = [];
    await Promise.all(
      events.map((event, idx) => {
        return setTimeout(
          () => calendarApi.events.insert(event),
          // const eventResponse = await calendarApi.events.insert(event);
          // console.log("Schduled an event with ", eventResponse);
          // scheduledEvents.push(eventResponse.data);
          1000 * idx
        );
      })
    );
    // u.googleEvents = scheduledEvents;
  } catch (e) {
    console.log(e);
  }

  return;
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
