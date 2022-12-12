import { GoogleConfig, GoogleUrls, scope } from "./config";

import axios from "axios";
import querystring from "querystring";

export function getGoogleAuthURL() {
  // console.log(GoogleConfig);
  const options = {
    redirect_uri: GoogleConfig.redirectUri,
    client_id: GoogleConfig.clientId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope,
  };

  return `${GoogleUrls.ROOT_AUTH}?${querystring.stringify(options)}`;
}

export function getTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<{
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}> {
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  /**
   *  access_token: '',
      expires_in: 3599,
      refresh_token: '',
      scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile',
      token_type: 'Bearer',
      id_token:
   */
  return axios
    .post(GoogleUrls.GET_TOKEN, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
}
