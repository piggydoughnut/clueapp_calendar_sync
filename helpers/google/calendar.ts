import { CALENDAR_NAME, googleCalendarConfig } from "../defines";
import { getOauth2Client, setClientCredentials } from "./oauthClient";

import axios from "axios";
import dayjs from "dayjs";
import { getCyclePhaseDates } from "../cycleLengths";
import { getUser } from "../database";
import { google } from "googleapis";
import jwt from "jsonwebtoken";

export const createGoogleCalendar = async (jwt: string) =>
  axios.post("/api/google/calendar", {}, { headers: { Authorization: jwt } });

export const getCalendarApi = async (client) =>
  google.calendar({
    version: "v3",
    auth: client,
  });

export const getCalendar = async (api, id: string) => {
  const exists = await api.calendars.get({
    calendarId: id,
  });
  console.log("The calendar already exists with id: ", exists.data.id);
  return exists;
};

export const createCalendar = async (api) => {
  const newCal = await api.calendars.insert({
    requestBody: {
      summary: CALENDAR_NAME,
    },
  });
  console.log("Created a new calendar with ID: ", newCal.data.id);
  return newCal;
};

export const getScheduledEvents = async (api, id: string) =>
  api.events.list({
    calendarId: id,
    timeMin: dayjs().subtract(1, "month").toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

export const listCalendars = async (api, id: string) =>
  api.calendarList.list({
    calendarId: id,
  });

export const createEvent = async (api, event) => api.events.insert(event);

export const removeEvent = async (
  api,
  id: string,
  eventId: string | string[]
) =>
  api.events.delete({
    calendarId: id,
    eventId,
  });

export const createCalendarForUser = async (jwtToken: string) => {
  try {
    const oauth2Client = getOauth2Client();

    const decoded = jwt.verify(jwtToken, process.env.JWT);
    const u = await getUser({ email: decoded.email });

    setClientCredentials(oauth2Client, u);

    const calendarApi = await google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    let calendarToEdit = null;

    if (!u.calendarId) {
      console.log("The calendar DOES NOT exist. Create new one");
      const newCal = await createCalendar(calendarApi);
      u.calendarId = newCal.data.id;
      await u.save();
      calendarToEdit = newCal.data.id;
    } else {
      const calendarExists = await getCalendar(calendarApi, u.calendarId);
      calendarToEdit = calendarExists.data.id;
    }
    // add the events for the given user
    console.log("Editing calendar with id: ", calendarToEdit);

    const clueData = u.clue.data[0];

    const cyclePhaseDates = getCyclePhaseDates(
      clueData.start,
      clueData.phases[0].length,
      clueData.length
    );
    console.log("cyclePhaseDates ", cyclePhaseDates);
    let events: any = [];

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
    console.log(events);

    // prepare events for inserting Clue calendar events
    await Promise.all(
      events.map((event, idx) => {
        return setTimeout(() => calendarApi.events.insert(event), 1000 * idx);
      })
    );
  } catch (e) {
    console.log(e);
  }

  return;
};

export const formatEvent = (conf, phase) => ({
  ...conf,
  start: {
    date: phase.startDate,
  },
  end: {
    date: phase.endDate,
  },
});

export const scheduleEvents = async (api, calendarId, cyclePhaseDates) => {
  let events: any = [];

  for (let i in cyclePhaseDates) {
    events.push({
      calendarId,
      resource: formatEvent(googleCalendarConfig[i], cyclePhaseDates[i]),
    });
  }

  // prepare events for inserting Clue calendar events
  await Promise.all(
    events.map((event, idx) => {
      console.log(
        `Adding event ${event.resource.summary} starting ${event.resource.start}`
      );
      return setTimeout(() => createEvent(api, event), 10000 * idx);
    })
  );
};

export const removeMultipleEvents = (api, calendarId, eventIds) =>
  Promise.all(
    eventIds.map((id, idx) =>
      setTimeout(() => removeEvent(api, calendarId, id), 1000 * idx)
    )
  );
