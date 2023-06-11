import { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/client/MongoDBClient";
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
        const userStocks = await portfolio
          .find({ userId: session?.user.id })
          .toArray();
        return res.status(200).json(userStocks);
      case "PATCH":
        const updateArgs = req.body;
        const existingStock = await portfolio.findOne(updateArgs.filter);
        // see if stock exists in stock array
        if (existingStock) {
          const updatedDocument = await portfolio.findOneAndUpdate(
            updateArgs.filter,
            updateArgs.update,
            updateArgs.options
          );
          return res.status(200).json(updatedDocument.value?.stocks);
        }
        // if not, add to stocks array
        await portfolio.updateOne(
          { userId: session?.user.id },
          updateArgs.insert
        );
        const updatedStock = await portfolio.findOne(updateArgs.filter);
        return res.status(200).json(updatedStock?.stocks);
      case "DELETE":
        const deleteArgs = req.body;
        const deletedDocument = await portfolio.findOneAndUpdate(
          deleteArgs.filter,
          deleteArgs.update,
          deleteArgs.options
        );
        return res.status(200).json(deletedDocument.value?.stocks);
      default:
        return res.status(405).end(`${req.method} is not allowed`);
    }
  } catch (ex) {
    console.log(ex);
    return res.status(500);
  }
}
