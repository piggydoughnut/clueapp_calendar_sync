// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  const tokenDetails = await axios.post(
    "https://api.helloclue.com/access-tokens",
    { email: req.body.email, password: req.body.password }
  );
  const cycles = await axios.get("https://api.helloclue.com/cycles", {
    headers: {
      Authorization: "Token ".concat(tokenDetails.data.access_token),
    },
  });
  console.log({ token: tokenDetails.data, cycles: cycles.data.cycles });
  res
    .status(200)
    .json({ token: tokenDetails.data, cycles: cycles.data.cycles });
}
