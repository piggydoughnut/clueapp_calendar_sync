import { GoogleConfig } from "../auth/config";
import { getUser } from "./database";
import jwt from "jsonwebtoken";

const { google } = require("googleapis");

export const createCalendarForUser = async (jwtToken: string) => {
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
  // prepare events for inserting Clue calendar events
  const event = await calendarApi.events.insert({
    calendarId: calendarToEdit,
    resource: {
      summary: "Brace yourself",
      description: "Slow down and be nice to yourself",
      colorId: 4,
      start: {
        date: "2022-12-19",
      },
      end: {
        date: "2022-12-25",
      },
    },
  });
  return event;
};
