import type { NextApiRequest, NextApiResponse } from "next";
import mongoClientPromise from "@/lib/mongoDBClient";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
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
    const users = db.collection("users");
    const accounts = db.collection("accounts");
    const sessions = db.collection("sessions");

    switch (req.method) {
      case "DELETE":
        const usersResponse = await users.deleteOne({
          _id: new ObjectId(session?.user.id),
        });
        const accountsResponse = await accounts.deleteMany({
          userId: new ObjectId(session?.user.id),
        });
        const sessionsResponse = await sessions.deleteMany({
          userId: new ObjectId(session?.user.id),
        });
        console.log(usersResponse, accountsResponse, sessionsResponse);
        return res
          .status(200)
          .json({ message: "user accounts deleted successfully" });
      default:
        return res.status(405).end(`${req.method} is not allowed`);
    }
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
