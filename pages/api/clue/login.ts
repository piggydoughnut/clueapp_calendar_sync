// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { login } from "@helpers/clue";

export default async function handler(req, res) {
  const data = await login(req.body.email, req.body.password);
  res.status(200).json(data);
}
