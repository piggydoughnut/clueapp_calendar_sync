import { CALENDAR_NAME, googleCalendarConfig } from "../defines";
import { getOauth2Client, setClientCredentials } from "./oauthClient";

import axios from "axios";
import { getCyclePhaseDates } from "../cycleLengths";
import { getUser } from "../database";
import { google } from "googleapis";
import jwt from "jsonwebtoken";

export const createGoogleCalendar = async (jwt: string) =>
  axios.post("/api/googleCalendar", {}, { headers: { Authorization: jwt } });

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
  });

export const listCalendars = async (api, id: string) =>
  api.calendarList.list({
    calendarId: id,
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
