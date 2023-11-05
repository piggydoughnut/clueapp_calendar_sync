import { NextApiRequest, NextApiResponse } from "next";

import { GoogleCalendarSingleton } from "@helpers/google/calendarApi";
import { GoogleUrls } from "@auth/config";
import User from "@db/models/user";
import axios from "axios";
import dbConnect from "@db/mongodb";
import { filterOutAlreadyScheduledEvents } from "@helpers/google/calendar";
import { getCyclePhaseDates } from "@helpers/cycleLengths";
import { getJWTToken } from "@helpers/jwt";
import { getTokens } from "@auth/google-auth";

//@fixme fix User type
const processUser = async (
  user: any,
  calendarId: string | null,
  state: any
) => {
  if (!calendarId) {
    console.error("The user does not have a calendar id saved in the database");
    return;
  }
  const calendarInstance = GoogleCalendarSingleton.getInstance({
    refreshToken: user.refreshToken,
    accessToken: user.accessToken,
    idToken: user.idToken,
    scope: user.scope,
  });
  await user.updateOne({ _id: user.id }, { $set: { calendarId: calendarId } });

  const startDate = state?.startDate;
  const periodLength = state?.periodLength;
  const cycleLength = state?.cycleLength;

  let events = getCyclePhaseDates(
    startDate,
    Number(periodLength),
    Number(cycleLength)
  );

  const filteredEvents = filterOutAlreadyScheduledEvents(
    events,
    user.googleEvents
  );

  if (!!filteredEvents) {
    const created: Array<{
      id: string;
      event: { description: string; start: string; end: string };
    }> = await calendarInstance.scheduleEvents(calendarId, events);
    user.googleEvents.push(created);
    await user.updateOne(
      { _id: user.id },
      { $set: { googleEvents: user.googleEvents.flat() } }
    );
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.JWT) {
    return res.redirect(`/signup?msg=400`);
  }
  const stateParam = req.query?.state;

  const state = typeof stateParam === "string" ? JSON.parse(stateParam) : null;

  if (!state) {
    // @todo handle this error
    console.log("ERRRR, state is null");
  }
  const code = req.query.code as string;
  try {
    //@todo handle errrrrs
    const { id_token, access_token, refresh_token, scope } = await getTokens({
      code,
    });
    const credentials = {
      refreshToken: refresh_token,
      scope: scope,
      idToken: id_token,
      accessToken: access_token,
    };

    let result = await axios.get(GoogleUrls.USER_INFO(access_token), {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
    const googleUser: { email: string; name: string } = result.data;

    await dbConnect();

    const jwtToken = getJWTToken(googleUser.email, googleUser.name);
    let user = await User.findOne({
      email: googleUser.email,
    });

    if (!user) {
      const newUser = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        ...credentials,
        // @todo check how many times each jwt was used, allow only once for each token
        signupTokens: [{ token: jwtToken, used: 0 }],
      });
      const calendarInstance = GoogleCalendarSingleton.getInstance(credentials);
      const newCalendar = await calendarInstance.createCalendar();
      await processUser(newUser, newCalendar.data.id ?? null, state);
      res.redirect(`/google-sync?jwt=${jwtToken}`);
    } else {
      console.log("We have already registered this user ", user.email);
      await processUser(user, user.calendarId ?? null, state);
      return res.redirect(`/google-sync?msg=101`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
