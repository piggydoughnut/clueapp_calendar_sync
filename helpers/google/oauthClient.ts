const { google } = require("googleapis");

import { OAuth2Client } from "google-auth-library";

export const getOauth2Client = (): OAuth2Client => {
  return new google.auth.OAuth2({
    // code,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/api/google",
  });
};

export const setClientCredentials = (
  client: OAuth2Client,
  {
    refreshToken,
    accessToken,
    idToken,
    scope,
  }: {
    refreshToken: string;
    accessToken: string;
    idToken: string;
    scope: string;
  }
) => {
  client.setCredentials({
    refresh_token: refreshToken,
    access_token: accessToken,
    id_token: idToken,
    scope: scope,
  });
};
