// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../db/mongodb";
import { getUser } from "../../helpers/database";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ err: e });
  }

  if (req.method === "PUT") {
    try {
      // @todo add validation
      const jwtToken = req.headers.authorization;
      const decoded = jwt.verify(jwtToken, process.env.JWT);

      const userInTheDatabase = await getUser({ email: decoded.email });

      if (userInTheDatabase) {
        userInTheDatabase.clue = {
          accessDetails: req.body.access,
          data: req.body.data,
        };
        // not using this right now
        // userInTheDatabase.signupTokens = userInTheDatabase.signupTokens.map(
        //   (t) => {
        //     if (t.token === jwtToken) {
        //       return {
        //         token: jwtToken,
        //         used: 1,
        //       };
        //     }
        //     return t;
        //   }
        // );
        await userInTheDatabase.save();
        return res.status(200).json();
      } else {
        return res.status(400).json({ err: "Token has been already used" });
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  } else {
    res.status(200).json({ q: "WHAAAT?>?> Doe" });
  }
}
