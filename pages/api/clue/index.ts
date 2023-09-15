// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CalendarDatesType, CyclePhaseDates } from "@helpers/types";
import { NextApiRequest, NextApiResponse } from "next";

import { GoogleCalendarSingleton } from "@helpers/google/calendarApi";
import User from "@db/models/user";
import { calendar_v3 } from "googleapis";
import dbConnect from "@db/mongodb";
import { getCyclePhaseDates } from "@helpers/cycleLengths";
import { login } from "@helpers/clue";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const extraLogs = process.env.EXTRA_LOGS === "true";
    const allUsers = await User.find();

    for (const user of allUsers) {
      console.log(`Processing ${user.id}`);
      const calendarInstance = GoogleCalendarSingleton.getInstance({
        refreshToken: user?.refreshToken,
        accessToken: user?.accessToken,
        idToken: user?.idToken,
        scope: user?.scope,
      });
      if (!user.calendarId) {
        extraLogs &&
          console.error(
            `Calendar was not created for this user - ${user.id}: ${user.get(
              "email"
            )}`
          );
        return;
      }
      // Get currently scheduled calendar events
      const events: calendar_v3.Schema$Event[] | undefined =
        await calendarInstance.getScheduledEvents(user.calendarId);

      if (!!events?.length) {
        // schedule the events for this person
      }

      const calendarDates: Record<string, CalendarDatesType> = {};
      events?.map((item: calendar_v3.Schema$Event) => {
        if (item.description && item.start?.date && item.end?.date && item.id) {
          calendarDates[item?.description] = {
            startDate: item?.start.date,
            endDate: item?.end.date,
            id: item.id,
          };
        }
      });
      // each user, I get Clue details data

      const clue = user.clue.accessDetails;
      const response = await login(clue.email, clue.password);
      const total = response.cycles.length;
      const cycleLast = response.cycles.slice(total - 5, total - 4)[0];
      const cyclePhaseDatesLast: CyclePhaseDates = getCyclePhaseDates(
        cycleLast.phases[0].start,
        cycleLast.phases[0].length,
        cycleLast.expectedLength
      );
      console.log("Last cycle ", cyclePhaseDatesLast);

      const cycleCurrent = response.cycles.slice(total - 4, total - 3)[0];
      const cyclePhaseDatesCurrent: CyclePhaseDates = getCyclePhaseDates(
        cycleCurrent.phases[0].start,
        cycleCurrent.phases[0].length,
        cycleCurrent.expectedLength
      );
      extraLogs && console.log("Current cycle ", cyclePhaseDatesCurrent);

      const cycleComing = response.cycles.slice(total - 3, total - 2)[0];
      const cyclePhaseDatesComing: CyclePhaseDates = getCyclePhaseDates(
        cycleComing.phases[0].start,
        cycleComing.phases[0].length,
        cycleComing.expectedLength
      );
      extraLogs && console.log("Next cycle", cyclePhaseDatesComing);

      if (extraLogs) {
        console.log("calendar dates ", calendarDates);
      }
      return;
      // if (!Object.keys(calendarDates).length) {
      //   console.log(
      //     `No events are scheduled in the calendar for user ${user.id}`
      //   );
      //   await scheduleEvents(calendarApi, user.calendarId, cyclePhaseDates);
      //   console.log("Scheduled events");
      //   continue;
      // }
      // // compare dates
      // let diff = false;
      // for (const i in calendarDates) {
      //   if (diff) {
      //     break;
      //   }
      //   if (
      //     cyclePhaseDates[i]?.startDate !== calendarDates[i]?.startDate ||
      //     cyclePhaseDates[i]?.endDate !== calendarDates[i]?.endDate
      //   ) {
      //     diff = true;
      //   }
      // }
      // if (diff) {
      //   console.log("not the same, gotta reschedule this period of time");
      //   const eventIds = [];
      //   for (let i in calendarDates) {
      //     eventIds.push(calendarDates[i].id);
      //   }
      //   console.log(
      //     `calendar: ${user.calendarId} -  We will delete these events  ${eventIds}`
      //   );
      //   await removeMultipleEvents(calendarApi, user.calendarId, eventIds);
      //   await scheduleEvents(calendarApi, user.calendarId, cyclePhaseDates);
      // } else {
      //   console.log("same same, do nothing");
      // }
      // console.log(`Processed ${allUsers.length} users`);
      // return res.json("");
    }

    return res.send("");
  } catch (e) {
    console.log(e);
    return res.status(400).json({ err: e });
  }
}
