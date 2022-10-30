export const scope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/calendar.events.owned",
].join(" ");

export const GoogleConfig = {
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
};

export const GoogleUrls = {
  ROOT_AUTH: "https://accounts.google.com/o/oauth2/v2/auth",
  GET_TOKEN: "https://oauth2.googleapis.com/token",
  USER_INFO: (access_token) =>
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
};
