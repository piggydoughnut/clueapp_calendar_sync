import { GoogleConfig, GoogleUrls } from "@auth/config";
import { NextApiRequest, NextApiResponse } from "next";
import { createEvents, getCalendarForUser } from "@helpers/google/calendar";

import User from "@db/models/user";
import axios from "axios";
import dbConnect from "@db/mongodb";
import { getCyclePhaseDates } from "@helpers/cycleLengths";
import { getTokens } from "@auth/google-auth";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //@todo handle errrrrs
  const code = req.query.code as string;
  const { id_token, access_token, expires_in, refresh_token, scope } =
    await getTokens({
      code,
      clientId: GoogleConfig.clientId ?? "",
      clientSecret: GoogleConfig.secret ?? "",
      redirectUri: GoogleConfig.redirectUri ?? "",
    });

  const googleUser = await axios.get(GoogleUrls.USER_INFO(access_token), {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });

  try {
    await dbConnect();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ err: e });
  }
  if (!process.env.JWT) {
    return res.redirect(`/signup?msg=400`);
  }
  const jwtToken = jwt.sign(
    {
      email: googleUser.data.email,
      name: googleUser.data.name,
    },
    process.env.JWT ?? "",
    { expiresIn: "10min" }
  );
  try {
    let user = await User.findOne({
      email: googleUser.data.email,
    });
    let calendarId;

    if (!user) {
      user = await User.create({
        name: googleUser.data.name,
        email: googleUser.data.email,
        refreshToken: refresh_token,
        scope: scope,
        idToken: id_token,
        accessToken: access_token,
        // @todo check how many times each jwt was used, allow only once for each token
        signupTokens: [{ token: jwtToken, used: 0 }],
      });
      calendarId = await getCalendarForUser(googleUser.data.email ?? null);
    } else {
      console.log("We have already registered this user ", user.email);
      calendarId = user.calendarId;
    }

    await user.update({ calendarId: calendarId });

    // @fixme pass these from FE
    const start = "2023-06-01";
    const periodLength = "5";
    const cycleLength = "27";

    const events = getCyclePhaseDates(
      start,
      Number(periodLength),
      Number(cycleLength)
    );

    const created = await createEvents(events, user);
    // @todo check already existing events
    user.googleEvents.push(created);
    await user.update({ googleEvents: user.googleEvents.flat() });
    return res.redirect(`/google-sync?msg=101`);
  } catch (error) {
    console.log(error);
  }
  res.redirect(`/google-sync?jwt=${jwtToken}`);
}
