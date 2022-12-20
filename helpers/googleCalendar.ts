import { GoogleConfig } from "../auth/config";
import { getCyclePhaseDates } from "./cycleLengths";
import { getUser } from "./database";
import { googleCalendarConfig } from "./defines";
import jwt from "jsonwebtoken";

const { google } = require("googleapis");

export const createCalendarForUser = async (jwtToken: string) => {
  try {
    const oauth2Client = new google.auth.OAuth2({
      // code,
      clientId: GoogleConfig.clientId,
      clientSecret: GoogleConfig.secret,
      redirectUri: GoogleConfig.redirectUri,
    });
    const CALENDAR_NAME = "My cycle";

    const decoded = jwt.verify(jwtToken, process.env.JWT);
    const u = await getUser({ email: decoded.email });

    oauth2Client.setCredentials({
      refresh_token: u.refreshToken,
      access_token: u.accessToken,
      id_token: u.idToken,
      scope: u.scope,
    });

    const calendarApi = await google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    let calendarToEdit = null;

    if (!u.calendarId) {
      console.log("The calendar DOES NOT exist. Create new one");
      const newCal = await calendarApi.calendars.insert({
        requestBody: {
          summary: CALENDAR_NAME,
        },
      });
      u.calendarId = newCal.data.id;
      await u.save();
      console.log("Created a new calendar with ID: ", newCal.data.id);
      calendarToEdit = newCal.data.id;
    } else {
      const calendarExists = await calendarApi.calendars.get({
        calendarId: u.calendarId,
      });
      console.log(
        "The calendar already exists with id: ",
        calendarExists.data.id
      );
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
    console.log(cyclePhaseDates);
    let events = [];

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
    await Promise.all(events.map((event) => calendarApi.events.insert(event)));
  } catch (e) {
    console.log(e);
  }

  return;
};
