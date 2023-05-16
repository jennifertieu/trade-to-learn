import type { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/client/MongoDBClient";
import { authOptions } from "../auth/[...nextauth]";
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
      case "PUT":
        // update existing user portfolio data
        break;
      case "DELETE":
        // delete user portfolio
        break;
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
