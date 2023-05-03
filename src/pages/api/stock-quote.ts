import type { NextApiRequest, NextApiResponse } from "next";
import { getStockQuote } from "@/client/StockDataClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getStockQuote();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
}
