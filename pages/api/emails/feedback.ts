import { NextApiRequest, NextApiResponse } from "next";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TemplateName, getTemplate } from "@helpers/templates";

import Config from "config";
import { sendEmail } from "@helpers/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const result = await sendEmail(
        Config.email.support,
        getTemplate(
          {
            youremail: req.body.youremail,
            trackerName: req.body.trackerName,
            changeTracker: req.body.changeTracker,
            whychange: req.body.whychange,
            feedback: req.body.feedback,
          },
          TemplateName.FEEDBACK
        ),
        "Hack Your Cycle - Feedback Form"
      );
      res.status(200).json({ RRR: result });
    } catch (e) {
      console.log(e);
      return res.status(400).end();
    }
  } else {
    return res.status(405).end();
  }
}
