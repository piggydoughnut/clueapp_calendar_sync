// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { TemplateName, getTemplate } from "../../helpers/templates";

import Mailgun from "mailgun.js";

const formData = require("form-data");
const sharp = require("sharp");

const resizeImage = async (fileBuffer) => {
  return sharp(fileBuffer)
    .extract({ left: 0, top: 0, width: 670, height: 540 })
    .toBuffer()
    .then((data) => {
      return data;
    });
};

export default async function handler(req, res) {
  const mailgun = new Mailgun(formData);

  const DOMAIN = "hack-your-cycle.com";
  const client = mailgun.client({
    username: "api",
    key: process.env.EMAIL_API_KEY,
  });

  const template = getTemplate({}, TemplateName.CALENDAR);
  const encoding = "data:image/png;base64,".length;
  const base64String = req.body.screenshot.substring(
    encoding,
    req.body.screenshot.length
  );

  let fileBuffer = Buffer.from(base64String, "base64");

  fileBuffer = await resizeImage(fileBuffer);

  const attachmentFile = {
    data: fileBuffer,
    filename: "calendar.png",
    "content-type": "image/png",
  };

  const data = {
    from: "Hack Your Cycle Team <team@hack-your-cycle.com>",
    to: req.body.userEmail,
    subject: "Personalized Cycle Calendar",
    html: template,
    inline: attachmentFile,
    attachment: [attachmentFile],
  };

  const result = await client.messages.create(DOMAIN, data);
  console.log(result);

  res.status(200).json({ RRR: result });
}
