import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { makeTrade } from "@/lib/trade";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try {
    if (req.method === "POST") {
      const { userId, ticker, action, quantity, orderType, duration } =
        JSON.parse(req.body);
      const response = await makeTrade(
        userId,
        ticker,
        action,
        quantity,
        orderType,
        duration
      );
      return res.status(200).json(response);
    }
    return res.status(405).end(`${req.method} is not allowed`);
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
