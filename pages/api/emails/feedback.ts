// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TemplateName, getTemplate } from "../../../helpers/templates";

import { sendEmail } from "../../../helpers/email";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const result = await sendEmail(
        "drmikhailova@gmail.com",
        getTemplate(
          {
            youremail: req.body.youremail,
            trackerName: req.body.trackerName,
            changeTracker: req.body.changeTracker,
            feedback: req.body.feedback,
          },
          TemplateName.FEEDBACK
        ),
        "Hack The Cycle - Feedback Form"
      );
      res.status(200).json({ RRR: result });
    } else {
      return res.status(400).json();
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json();
  }
}
