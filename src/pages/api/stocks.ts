import { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/lib/mongoDBClient";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

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
    const db = (await mongoClientPromise).db();
    const stocks = db.collection("stocks");

    switch (req.method) {
      case "GET":
        // get all stock data
        const stocksData = await stocks.find({}).toArray();
        return res.status(200).json(stocksData);
      case "PATCH":
        // update stock data
        const updateResults = await stocks.bulkWrite(req.body);
        return res.status(200).json(updateResults);
      default:
        return res.status(405).end(`${req.method} is not allowed`);
    }
  } catch (ex) {
    console.log(ex);
    return res.status(500);
  }
}
