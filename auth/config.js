export const scope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/calendar",
].join(" ");

export const GoogleConfig = {
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI ?? "",
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
};

const API = "https://www.googleapis.com";

export const GoogleUrls = {
  ROOT_AUTH: "https://accounts.google.com/o/oauth2/v2/auth",
  GET_TOKEN: "https://oauth2.googleapis.com/token",
  USER_INFO: (access_token) =>
    `${API}/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
  CALENDAR_LIST: (access_token) =>
    `${API}/calendar/v3/users/me/calendarList?key=${access_token}`,
};
