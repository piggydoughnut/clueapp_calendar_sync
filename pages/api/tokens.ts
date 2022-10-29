// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  console.log(req.body);
  const tokenDetails = await axios.post(
    "https://api.helloclue.com/access-tokens",
    { email: req.body.email, password: req.body.password }
  );
  const cycles = await axios.get("https://api.helloclue.com/cycles", {
    headers: {
      Authorization: "Token ".concat(tokenDetails.data.access_token),
    },
  });
  console.log(tokenDetails);
  res
    .status(200)
    .json({ token: tokenDetails.data, cycles: cycles.data.cycles });
}
