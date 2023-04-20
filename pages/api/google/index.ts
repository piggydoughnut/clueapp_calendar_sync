import { GoogleConfig, GoogleUrls } from "../../../auth/config";
import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@db/models/user";
import axios from "axios";
import dbConnect from "@db/mongodb";
import { getTokens } from "../../../auth/google-auth";
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
    // @ts-ignore
    const userInTheDatabase = await User.findOne({
      email: googleUser.data.email,
    });

    if (!userInTheDatabase) {
      /* @ts-ignore */
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
      // console.log("Created a user ", user);
    } else {
      console.log(
        "We have already registered this user ",
        userInTheDatabase.email
      );
      return res.redirect(`/signup?msg=101`);
    }
  } catch (error) {
    console.log(error);
    // return res.status(400).json(error);
  }
  res.redirect(`/signup?jwt=${jwtToken}`);
}
