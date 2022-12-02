// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Mailgun from "mailgun.js";
import { getCalendarTemplate } from "../../helpers/templates/calendarTemplate";
const formData = require("form-data");

export default async function handler(req, res) {
  const mailgun = new Mailgun(formData);

  const DOMAIN = "hack-your-cycle.com";
  const client = mailgun.client({
    username: "api",
    key: process.env.EMAIL_API_KEY,
  });

  const template = getCalendarTemplate();
  const encoding = "data:image/png;base64,".length;
  const base64String = req.body.screenshot.substring(
    encoding,
    req.body.screenshot.length
  );

  const fileBuffer = Buffer.from(base64String, "base64");
  const attachmentFile = {
    data: fileBuffer,
    filename: "calendar.png",
    "content-type": "image/png",
  };

  const data = {
    from: "Excited User <me@hack-your-cycle.com>",
    to: "drmikhailova@gmail.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!",
    html: template,
    inline: attachmentFile,
    attachment: [attachmentFile],
  };

  const result = await client.messages.create(DOMAIN, data);
  console.log(result);

  res.status(200).json({ RRR: result });
}
