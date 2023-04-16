// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

import { getGoogleAuthURL } from "../../../auth/google-auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ googleAuthUrl: getGoogleAuthURL() });
}
