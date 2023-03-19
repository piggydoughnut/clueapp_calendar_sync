// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as User from "@db/models/user";

import {
  getCalendarApi,
  getScheduledEvents,
  removeMultipleEvents,
  scheduleEvents,
} from "@helpers/google/calendar";
import {
  getOauth2Client,
  setClientCredentials,
} from "@helpers/google/oauthClient";

import { calendar_v3 } from "googleapis";
import dbConnect from "@db/mongodb";
import { getCyclePhaseDates } from "@helpers/cycleLengths";
import { login } from "@helpers/clue";

export default async function handler(req, res) {
  const oauth2Client = getOauth2Client();
  await dbConnect();

  /* @ts-ignore */
  const allUsers = await User.find();

  await Promise.all(
    allUsers.map(async (user) => {
      setClientCredentials(oauth2Client, user);
      const calendarApi = await getCalendarApi(oauth2Client);

      try {
        // Get currently scheduled calendar events
        const { data: calEvents } = await getScheduledEvents(
          calendarApi,
          user.calendarId
        );
        const events: Array<calendar_v3.Schema$Event> = calEvents.items;

        const calendarDates = {};
        events.map((item) => {
          calendarDates[item.description] = {
            startDate: item.start.date,
            endDate: item.end.date,
            id: item.id,
          };
        });
        // each user, I get Clue details data
        console.log(
          `${user.id} : StartEnd ${user.clue.data[0].start} - ${user.clue.data[0].end}, length: ${user.clue.data[0].expectedLength}`
        );
        const clue = user.clue.accessDetails;
        const response = await login(clue.email, clue.password);
        const total = response.cycles.length;
        const cycle = response.cycles.slice(total - 3, total - 2)[0];
        const cyclePhaseDates = getCyclePhaseDates(
          cycle.phases[0].start,
          cycle.phases[0].length,
          cycle.expectedLength
        );

        console.log("cyclePhaseDates ", cyclePhaseDates);
        console.log("calendarDates", calendarDates);
        if (!Object.keys(calendarDates).length) {
          console.log(
            `No events are scheduled in the calendar for user ${user.id}`
          );
        }
        // compare dates
        let diff = false;
        for (let i in calendarDates) {
          if (diff) {
            break;
          }
          console.log(i);
          if (
            cyclePhaseDates[i]?.startDate !== calendarDates[i]?.startDate &&
            cyclePhaseDates[i]?.endDate !== calendarDates[i]?.endDate
          ) {
            diff = true;
          }
        }
        if (diff) {
          console.log("not the same, gotta reschedule this period of time");
          const eventIds = [];
          for (let i in calendarDates) {
            eventIds.push(calendarDates[i].id);
          }
          console.log(
            `calendar: ${user.calendarId} -  We will delete these events  ${eventIds}`
          );
          await removeMultipleEvents(calendarApi, user.calendarId, eventIds);
          await scheduleEvents(calendarApi, user.calendarId, cyclePhaseDates);
        } else {
          console.log("same same, do nothing");
        }
        console.log(`Processed ${allUsers.length} users`);
        return res.json();
      } catch (e) {
        console.log(e);
        console.log(e?.response?.data?.errors);
        return res.error();
      }
    })
  );
}
