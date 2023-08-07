import type { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/lib/mongoDBClient";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { fetchUserPortfolio } from "@/lib/portfolio";

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
        const userPortfolio = await fetchUserPortfolio(req.query.userId);
        return res.status(200).json(userPortfolio);
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
        const deleteResults = await portfolio.deleteOne(JSON.parse(req.body));
        return res.status(200).json(deleteResults);
      default:
        return res.status(405).end(`${req.method} is not allowed`);
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
