// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCalendarTemplate } from "../../helpers/templates/calendarTemplate";
import mailgun from "mailgun-js";

export default async function handler(req, res) {
  const DOMAIN = "hack-your-cycle.com";
  const mg = mailgun({
    apiKey: process.env.EMAIL_API_KEY,
    domain: DOMAIN,
  });

  const template = getCalendarTemplate("https://i.ibb.co/ckq41q3/sample.png");
  const data = {
    from: "Excited User <me@hack-your-cycle.com>",
    to: "drmikhailova@gmail.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!",
    html: template,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.status(200).json({ ERR: error });
    }
    console.log(body);

    res.status(200).json({ RRR: body });
  });
}
