// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as User from "../../../db/models/user";

import dbConnect from "../../../db/mongodb";
import { getTemplate } from "../../../helpers/templates/confirmation";
import { sendEmail } from "../../../helpers/email";

export default async function handler(req, res) {
  await dbConnect();
  const template = getTemplate();

  const jwtToken = req.headers.authorization;
  const userInTheDatabase = await User.findOne({
    "signupTokens:token": jwtToken,
  });
  if (userInTheDatabase) {
    const result = await sendEmail(
      userInTheDatabase.email,
      template,
      "Welcome to Hack Your Cycle"
    );
    res.status(200).json({ RRR: result });
  } else {
    return res.status(400).json();
  }
}
