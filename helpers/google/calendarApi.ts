import { CALENDAR_NAME, googleCalendarConfig } from "../defines";
import {
  CyclePhaseDates,
  GoogleCalendarCreateEvent,
  PhaseInfo,
  Resource,
} from "@helpers/types";
import { calendar_v3, google } from "googleapis";
import { getOauth2Client, setClientCredentials } from "./oauthClient";

import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import dayjs from "dayjs";

type Credentials = {
  refreshToken: string | undefined;
  accessToken: string | undefined;
  idToken: string | undefined;
  scope: string | undefined;
};

function delay(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export class GoogleCalendarSingleton {
  private static instance: GoogleCalendarSingleton;
  public client: OAuth2Client;
  public api: calendar_v3.Calendar;

  // Private constructor
  private constructor(credentials: Credentials) {
    const oauth2Client = getOauth2Client();
    setClientCredentials(oauth2Client, credentials);
    this.client = oauth2Client;
    this.api = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });
  }

  // Public method to get the singleton instance
  public static getInstance(credentials: Credentials): GoogleCalendarSingleton {
    if (!GoogleCalendarSingleton.instance) {
      GoogleCalendarSingleton.instance = new GoogleCalendarSingleton(
        credentials
      );
    }
    return GoogleCalendarSingleton.instance;
  }

  public getCalendar = async (id: string) => {
    const calendar = await this.api.calendars.get({
      calendarId: id,
    });
    console.log("The calendar already exists with id: ", calendar.data.id);
    return calendar;
  };

  public createCalendar = async (name?: string) => {
    const newCal = await this.api.calendars.insert({
      requestBody: {
        summary: name ?? CALENDAR_NAME,
      },
    });
    console.log("Created a new calendar with ID: ", newCal.data.id);
    return newCal;
  };

  /********** EVENTS **********/
  public createEvent = async (event: any) => this.api.events.insert(event);

  public removeEvent = async (id: string, eventId: string | string[]) =>
    //@ts-ignore
    this.api.events.delete({
      calendarId: id,
      eventId,
    });

  public removeMultipleEvents = (calendarId: string, eventIds: string[]) =>
    Promise.all(
      eventIds.map((id, idx) =>
        setTimeout(() => this.removeEvent(calendarId, id), 1000 * idx)
      )
    );

  public scheduleEvents = async (
    calendarId: string,
    cyclePhaseDates: CyclePhaseDates
  ) => {
    let events: any = [];

    // @fixme simplify
    for (let i in cyclePhaseDates) {
      events.push({
        calendarId,
        resource: this.formatEvent(googleCalendarConfig[i], cyclePhaseDates[i]),
      });
    }
    const createdEvents: Array<any> = [];
    await Promise.all(
      events.map(async (event: GoogleCalendarCreateEvent, idx: number) => {
        console.log(
          `Adding event ${event.resource.summary} starting ${event.resource.start}`
        );
        await delay(1000 * idx);
        const response = await this.createEvent(event);
        createdEvents.push({
          id: response.data.id,
          event: {
            description: response.data.description,
            start: response.data.start?.date,
            end: response.data.end?.date,
          },
        });
      })
    );
    return createdEvents;
  };

  public getScheduledEvents = async (id: string) =>
    this.api.events.list({
      calendarId: id,
      timeMin: dayjs().subtract(1, "month").toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

  public formatEvent = (conf: Resource, phase: PhaseInfo) => ({
    ...conf,
    start: {
      date: phase.startDate,
    },
    end: {
      date: phase.endDate,
    },
  });
}
