import Mailgun from "mailgun.js";
const formData = require("form-data");

export const sendEmail = async (
  email: string,
  template: string,
  subject: string
) => {
  if (process.env.EMAILS_OFF) {
    return "emails are off";
  }

  const mailgun = new Mailgun(formData);

  const DOMAIN = "hack-your-cycle.com";
  const client = mailgun.client({
    username: "api",
    key: process.env.EMAIL_API_KEY ?? "",
  });
  const data = {
    from: "Hack Your Cycle Team <team@hack-your-cycle.com>",
    to: email,
    subject: subject,
    html: template,
  };

  return client.messages.create(DOMAIN, data);
};
