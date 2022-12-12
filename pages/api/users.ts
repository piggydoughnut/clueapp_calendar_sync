// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as User from "../../db/models/user";

import dbConnect from "../../db/mongodb";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "PUT") {
    try {
      // @todo add validation
      // check token validity maybe hash the token with a secret
      const jwtToken = req.headers.authorization;
      const userInTheDatabase = await User.findOne({
        "signupTokens:token": jwtToken,
        "signupTokens:user": 0,
      });
      if (userInTheDatabase) {
        userInTheDatabase.clue = {
          accessDetails: req.body.access,
          data: req.body.data,
        };
        userInTheDatabase.signupTokens = userInTheDatabase.signupTokens.map(
          (t) => {
            if (t.token === jwtToken) {
              return {
                token: jwtToken,
                used: 1,
              };
            }
            return t;
          }
        );
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
    res.status(200).json({ name: "WHAAAT?>?> Doe" });
  }
}
