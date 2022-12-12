// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as User from "../../db/models/user";

import { GoogleConfig, GoogleUrls } from "../../auth/config";

import axios from "axios";
import dbConnect from "../../db/mongodb";
import { getTokens } from "../../auth/google-auth";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  //@todo handle errrrrs
  const code = req.query.code as string;
  const { id_token, access_token, expires_in, refresh_token, scope } =
    await getTokens({
      code,
      clientId: GoogleConfig.clientId,
      clientSecret: GoogleConfig.secret,
      redirectUri: GoogleConfig.redirectUri,
    });

  const googleUser = await axios.get(GoogleUrls.USER_INFO(access_token), {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });

  await dbConnect();
  // console.log("expires_in ", expires_in);
  // console.log("refresh_token ", refresh_token);
  // console.log("scope ", scope);
  // console.log(googleUser.data);

  const jwtToken = jwt.sign(
    {
      data: "foobar",
    },
    "secret",
    { expiresIn: "10min" }
  );
  try {
    const userInTheDatabase = await User.find({ email: googleUser.data.email });

    if (userInTheDatabase.length === 0) {
      const user = await User.create({
        name: googleUser.data.name,
        email: googleUser.data.email,
        refreshToken: refresh_token,
        scope: scope,
        idToken: id_token,
        accessToken: access_token,
        // @todo check how many times each jwt was used, allow only once for each token
        signupTokens: [{ token: jwtToken, used: 0 }],
      });
      // console.log("saved user ", user);
    } else {
      console.log("We have already registered this user");
    }
  } catch (error) {
    console.log(error);
  }

  res.redirect(`/signup?jwt=${jwtToken}`);
}
