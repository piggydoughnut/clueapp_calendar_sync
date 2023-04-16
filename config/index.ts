const Config = {
  email: {
    apiKey: process.env.EMAIL_API_KEY ?? "",
    support: process.env.SUPPORT_EMAIL ?? "",
  },
};
export default Config;
