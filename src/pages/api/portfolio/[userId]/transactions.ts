import { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/lib/mongoDBClient";
import { authOptions } from "../../auth/[...nextauth]";
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
        const transactionData = await portfolio
          .find({
            userId: session?.user.id,
          })
          .toArray();
        return res.status(200).json(transactionData);
      case "PATCH":
        // upsert stock data
        const updateArgs = req.body;
        const updatedDocument = await portfolio.findOneAndUpdate(
          updateArgs.filter,
          updateArgs.update,
          updateArgs.options
        );
        return res.status(200).json(updatedDocument.value?.transactions);
      default:
        return res.status(405).end(`${req.method} is not allowed`);
    }
  } catch (ex) {
    console.log(ex);
    return res.status(500);
  }
}
