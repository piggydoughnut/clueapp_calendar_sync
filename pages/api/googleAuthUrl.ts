// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getGoogleAuthURL } from "../../../auth/google-auth";

export default function handler(req, res) {
  res.status(200).json({ googleAuthUrl: getGoogleAuthURL() });
}
