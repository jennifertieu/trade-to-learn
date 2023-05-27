import { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/client/MongoDBClient";
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
      case "POST":
        // insert stock data
        const insertResults = await stocks.insertMany(req.body);
        return res.status(200).json(insertResults);
      case "PUT":
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
