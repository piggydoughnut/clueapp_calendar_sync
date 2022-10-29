// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async function handler(req, res) {
  console.log(req.body);
  const tokenDetails = await axios.post(
    "https://api.helloclue.com/access-tokens",
    { email: req.body.email, password: req.body.password }
  );
  console.log(tokenDetails);
  res.status(200).json(tokenDetails.data);
}
