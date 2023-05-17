import type { NextApiRequest, NextApiResponse } from "next";
import { getStockQuote } from "@/client/StockDataClient";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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
    const data = await getStockQuote();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
}
