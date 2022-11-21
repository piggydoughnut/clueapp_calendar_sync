// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GoogleConfig } from "../../../auth/config";

const { google } = require("googleapis");

export default async function handler(req, res) {
  const code = req.query.code as string;

  const oauth2Client = new google.auth.OAuth2({
    // code,
    clientId: GoogleConfig.clientId,
    clientSecret: GoogleConfig.secret,
    redirectUri: GoogleConfig.redirectUri,
  });

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);
  const calendarApi = await google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const CALENDAR_NAME = "My cycle";

  try {
    // const cals = await calendarApi.calendarList.list();
    const calendarExists = await calendarApi.calendars.get({
      calendarId: "v1hgbrvqklruabijv4u12155ac@group.calendar.google.com",
    });
    // const a = await calendarApi.colors.get();

    // return res.status(200).json(a);

    console.log(calendarExists);
    if (calendarExists?.data?.id) {
      console.log("The calendar already exists");
      const event = await calendarApi.events.insert({
        calendarId: calendarExists.data.id,
        resource: {
          summary: "Brace yourself",
          description: "Slow down and be nice to yourself",
          colorId: 4,
          start: {
            date: "2022-11-19",
          },
          end: {
            date: "2022-11-25",
          },
        },
      });
      console.log(event);
    } else {
      console.log("The calendar DOES NOT exist. Create new one");
      const newCal = await calendarApi.calendars.insert({
        requestBody: {
          summary: CALENDAR_NAME,
        },
      });
      console.log(newCal);
      console.log("ID: ", newCal.id);
      // save newCal.data.id to the database next to the user who is authenticated
    }
    res.status(200).json(calendarExists);
    // res.status(200).json({ newCal: newCal, d: cals.data.items });
  } catch (e) {
    console.log(e);
    res.status(400).json({ e: e.message });
  }
}
