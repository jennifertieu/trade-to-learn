import { fetchStockQuoteData } from "@/lib/stocks";
import type { NextApiRequest, NextApiResponse } from "next";
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
    const stockQuotes = await fetchStockQuoteData();
    return res.status(200).json(stockQuotes);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
