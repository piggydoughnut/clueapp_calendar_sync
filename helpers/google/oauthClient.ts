const { google } = require("googleapis");

export const getOauth2Client = () => {
  return new google.auth.OAuth2({
    // code,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: "http://localhost:3000/api/google",
  });
};

export const setClientCredentials = (
  client,
  { refreshToken, accessToken, idToken, scope }
) => {
  client.setCredentials({
    refresh_token: refreshToken,
    access_token: accessToken,
    id_token: idToken,
    scope: scope,
  });
};
