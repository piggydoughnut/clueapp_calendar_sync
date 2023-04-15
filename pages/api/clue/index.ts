// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  CalendarDatesType,
  CalendarEvent,
  CyclePhaseDates,
} from "@helpers/types";
import { NextApiRequest, NextApiResponse } from "next";
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

import User from "@db/models/user";
import dbConnect from "@db/mongodb";
import { getCyclePhaseDates } from "@helpers/cycleLengths";
import { login } from "@helpers/clue";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const oauth2Client = getOauth2Client();
  try {
    await dbConnect();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ err: e });
  }
  const extraLogs = process.env.EXTRA_LOGS === "true";
  const allUsers = await User.find();

  for (const user of allUsers) {
    console.log(`Processing ${user.id}`);
    setClientCredentials(oauth2Client, user);
    const calendarApi = await getCalendarApi(oauth2Client);
    if (!user.calendarId) {
      extraLogs &&
        console.error(
          `Calendar was not created for this user - ${user.id}: ${user.get(
            "email"
          )}`
        );
      return;
    }
    try {
      // Get currently scheduled calendar events
      const { data: calEvents } = await getScheduledEvents(
        calendarApi,
        user.calendarId
      );
      const events: Array<CalendarEvent> = calEvents.items;

      if (!!events.length) {
        // schedule the events for this person
      }

      const calendarDates: Record<string, CalendarDatesType> = {};
      events.map((item: CalendarEvent) => {
        if (item.description && item.start?.date && item.end?.date && item.id) {
          calendarDates[item?.description] = {
            startDate: item?.start.date,
            endDate: item?.end.date,
            id: item.id,
          };
        }
      });
      // each user, I get Clue details data
      extraLogs &&
        console.log(
          `${user.id} : StartEnd ${user.clue.data[0].start} - ${user.clue.data[0].end}, length: ${user.clue.data[0].expectedLength}`
        );
      const clue = user.clue.accessDetails;
      const response = await login(clue.email, clue.password);
      const total = response.cycles.length;
      const cycle = response.cycles.slice(total - 3, total - 2)[0];
      const cyclePhaseDates: CyclePhaseDates = getCyclePhaseDates(
        cycle.phases[0].start,
        cycle.phases[0].length,
        cycle.expectedLength
      );

      extraLogs && console.log("cyclePhaseDates ", cyclePhaseDates);
      extraLogs && console.log("calendarDates", calendarDates);
      if (!Object.keys(calendarDates).length) {
        console.log(
          `No events are scheduled in the calendar for user ${user.id}`
        );
        await scheduleEvents(calendarApi, user.calendarId, cyclePhaseDates);
        console.log("Scheduled events");
        continue;
      }
      // compare dates
      let diff = false;
      for (const i in calendarDates) {
        if (diff) {
          break;
        }
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
      return res.json("");
    } catch (e: unknown) {
      console.log(e);
      console.log(e?.response?.data?.errors);
    }
  }

  return res.send("");
}
