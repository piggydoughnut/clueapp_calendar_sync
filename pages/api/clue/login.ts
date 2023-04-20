import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { login } from "@helpers/clue";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await login(req.body.email, req.body.password);
    res.status(200).json(data);
  } catch (e: unknown) {
    if (e.response.status === 401) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    return res.status(400).end();
  }
}
