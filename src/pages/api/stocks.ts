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
        res.status(200).json(stocksData);
        break;
      case "POST":
        // insert stock data
        const result = await stocks.insertMany(req.body);
        res.status(200).json(result);
        break;
      case "PUT":
        // update stock data
        const resp = await stocks.bulkWrite(req.body);
        res.status(200).json(resp);
        break;
    }
  } catch (ex) {
    console.log(ex);
    return res.status(500);
  }
}
