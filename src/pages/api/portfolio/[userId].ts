import type { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/client/MongoDBClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = (await mongoClientPromise).db();
    const portfolio = db.collection("portfolio");

    switch (req.method) {
      case "GET":
        const query = { userId: req.query.userId };
        const userPortfolio = await portfolio.findOne(query);
        res.status(200).json(userPortfolio);
        break;
      case "POST":
        const result = await portfolio.insertOne(JSON.parse(req.body));
        console.log(result);
        res.status(200).json(result);
        break;
    }
  } catch (ex) {
    console.log(ex);
    return ex;
  }
}
