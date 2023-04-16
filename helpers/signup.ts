// @ts-nocheck
import axios from "axios";

export const updateUserWithClueData = async (
  clueData,
  cycleData,
  jwt: string
) => {
  const data = {
    access: clueData,
    data: cycleData,
  };
  await axios.put("/api/users", data, {
    headers: {
      Authorization: jwt,
    },
  });
};

export const createGoogleCalendar = async (jwt: string) =>
  await axios.post(
    "/api/google/calendar",
    {},
    { headers: { Authorization: jwt } }
  );

export const sendConfirmation = async (jwt: string) => {
  await axios.post(
    "/api/emails/confirmation",
    {},
    {
      headers: { Authorization: jwt },
    }
  );
};
