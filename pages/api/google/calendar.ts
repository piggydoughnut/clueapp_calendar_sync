// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

// import { createCalendarForUser } from "@helpers/google/calendar";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const event = await createCalendarForUser(req.headers.authorization ?? null);
  res.status(200).json(event);
  res.status(200).json("Hello");
}
