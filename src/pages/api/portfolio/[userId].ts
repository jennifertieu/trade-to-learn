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
        return res.status(200).json(userPortfolio);
      case "POST":
        const insertResults = await portfolio.insertOne(JSON.parse(req.body));
        return res.status(200).json(insertResults);
      case "PUT":
        // update existing user portfolio data
        const updateArgs = JSON.parse(req.body);
        const updateResults = await portfolio.findOneAndUpdate(
          updateArgs.filter,
          updateArgs.update,
          updateArgs.options
        );
        return res.status(200).json(updateResults);
      case "DELETE":
        // TODO: delete user portfolio
        break;
      default:
        return res.status(405).end(`${req.method} is not allowed`);
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
