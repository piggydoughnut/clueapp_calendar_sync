import axios from "axios";

const Api = {
  Auth: "https://api.helloclue.com/access-tokens",
  Cycles: "https://api.helloclue.com/cycles",
};

const getCycleData = async (token: string) =>
  axios.get(Api.Cycles, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

const auth = async (email: string, password: string) =>
  await axios.post(Api.Auth, {
    email: email,
    password: password,
  });

export const login = async (
  email: string,
  password: string
): Promise<{ token: any; cycles: any }> => {
  const tokenDetails = await auth(email, password);
  const cycles = await getCycleData(tokenDetails.data.access_token);
  return {
    token: tokenDetails.data,
    cycles: cycles?.data?.cycles ?? [],
  };
};
