// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { TemplateName, getTemplate } from "@helpers/templates";

import Config from "config";
import Mailgun from "mailgun.js";
import { sendTelegramMessage } from "@helpers/telegram";

const formData = require("form-data");
const sharp = require("sharp");

const resizeImage = async (fileBuffer: Buffer) => {
  const metadata = await sharp(fileBuffer).metadata();
  const isPortrait = metadata.height > metadata.width;
  let newWidth, newHeight;
  if (isPortrait) {
    newWidth = metadata.width;
    newHeight = metadata.height / 2;
  } else {
    newWidth = metadata.width / 2;
    newHeight = metadata.height;
  }

  return sharp(fileBuffer)
    .extract({ left: 0, top: 0, width: newWidth, height: newHeight })
    .toBuffer()
    .then((data: Buffer) => {
      return data;
    });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mailgun = new Mailgun(formData);

  const DOMAIN = "hack-your-cycle.com";
  const client = mailgun.client({
    username: "api",
    key: Config.email.apiKey,
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
  
  try {
    await sendTelegramMessage(req.body.userEmail, "Personalized Cycle Calendar");
    console.log('✅ Telegram notification sent successfully for calendar');
  } catch (telegramError) {
    console.error('❌ Failed to send Telegram notification for calendar:', telegramError);
  }

  res.status(200).json({ RRR: result });
}
