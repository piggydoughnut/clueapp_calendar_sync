// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GoogleConfig, GoogleUrls } from "../../auth/config";

import axios from "axios";
import { getTokens } from "../../auth/google-auth";

export default async function handler(req, res) {
  const code = req.query.code as string;
  const { id_token, access_token } = await getTokens({
    code,
    clientId: GoogleConfig.clientId,
    clientSecret: GoogleConfig.secret,
    redirectUri: GoogleConfig.redirectUri,
  });

  const googleUser = await axios.get(GoogleUrls.USER_INFO(access_token), {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });
  res.redirect("/");
}
