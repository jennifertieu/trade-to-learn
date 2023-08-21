import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import {
  fetchUserPortfolio,
  updateUserPortfolio,
  deleteUserPorfolio,
} from "@/lib/portfolio";

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
    if (req.method === "GET") {
      const userPortfolio = await fetchUserPortfolio(req.query.userId);
      return res.status(200).json(userPortfolio);
    }
    if (req.method === "PUT") {
      // update existing user portfolio data
      const { userId, cash } = JSON.parse(req.body);
      const updatedDocument = await updateUserPortfolio(userId, cash);
      return res.status(200).json(updatedDocument);
    }
    if (req.method === "DELETE") {
      const { userId } = JSON.parse(req.body);
      const deleteResults = await deleteUserPorfolio(userId);
      return res.status(200).json(deleteResults);
    }

    return res.status(405).end(`${req.method} is not allowed`);
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
