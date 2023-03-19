// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createCalendarForUser } from "../../../helpers/google/calendar";

export default async function handler(req, res) {
  const event = await createCalendarForUser(req.headers.authorization);
  res.status(200).json(event);
}
