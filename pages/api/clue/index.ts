// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as User from "../../../db/models/user";

import {
  getCalendarApi,
  getScheduledEvents,
} from "../../../helpers/google/calendar";
import {
  getOauth2Client,
  setClientCredentials,
} from "../../../helpers/google/oauthClient";

import { calendar_v3 } from "googleapis";
import dbConnect from "../../../db/mongodb";
import { getCyclePhaseDates } from "../../../helpers/cycleLengths";
import { login } from "../../../helpers/clue";

export default async function handler(req, res) {
  const oauth2Client = getOauth2Client();
  await dbConnect();

  /* @ts-ignore */
  const allUsers = await User.find();

  allUsers.forEach(async (user) => {
    setClientCredentials(oauth2Client, user);
    const calendarApi = await getCalendarApi(oauth2Client);

    try {
      // Get currently scheduled calendar events
      const { data } = await getScheduledEvents(calendarApi, user.calendarId);
      const events: Array<calendar_v3.Schema$Event> = data.items;

      const calendarDates = {};
      events.map((item) => {
        calendarDates[item.description] = {
          startDate: item.start.date,
          endDate: item.end.date,
        };
      });
      // each user, I get Clue details data
      console.log(
        `${user.id} : StartEnd ${user.clue.data[0].start} - ${user.clue.data[0].end}, length: ${user.clue.data[0].expectedLength}`
      );
      const clue = user.clue.accessDetails;
      const response = await login(clue.email, clue.password);
      console.log(response);
      const total = response.cycles.length;
      const cycle = response.cycles.slice(total - 3, total - 2)[0];
      console.log(cycle);
      const clueDates = getCyclePhaseDates(
        cycle.phases[0].start,
        cycle.phases[0].length,
        cycle.expectedLength
      );

      console.log("clueDates ", clueDates);
      console.log("calendarDates", calendarDates);
      // compare dates
      let diff = false;
      for (let i in clueDates) {
        if (diff) {
          break;
        }
        console.log(i);
        if (
          clueDates[i].startDate !== calendarDates[i].startDate &&
          clueDates[i].endDate !== calendarDates[i].endDate
        ) {
          diff = true;
        }
      }
      let answer = "";
      if (diff) {
        answer = "not the same, gotta reschedule this period of time";
      } else {
        answer = "same same, do nothing";
      }

      return res.json(answer);
    } catch (e) {
      console.log(e);
      console.log(e?.response?.data?.errors);
    }
  });
}
