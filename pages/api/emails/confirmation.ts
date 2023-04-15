// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { TemplateName, getTemplate } from "@helpers/templates";

import User from "@db/models/user";
import dbConnect from "@db/mongodb";
import { sendEmail } from "@helpers/email";

export default async function handler(req, res) {
  try {
    await dbConnect();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ err: e });
  }
  const template = getTemplate({}, TemplateName.CONFIRMATION);

  const jwtToken = req.headers.authorization;
  /* @ts-ignore */
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
