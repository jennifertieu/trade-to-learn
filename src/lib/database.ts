import TradeRequest from "@/interfaces/TradeRequest";
import Holding from "@/types/Holding";
import mongoClientPromise from "./mongoDBClient";
import { Collection } from "mongodb";
import PortfolioDocument from "@/interfaces/PortfolioDocument";
import { ObjectId } from "mongodb";

async function getPortfolioCollection() {
  const db = (await mongoClientPromise).db();
  const Portfolio: Collection<PortfolioDocument> = db.collection("portfolio");
  return Portfolio;
}

async function getUsersCollection() {
  const db = (await mongoClientPromise).db();
  const users = db.collection("users");
  return users;
}

async function getAccountsCollection() {
  const db = (await mongoClientPromise).db();
  const accounts = db.collection("accounts");
  return accounts;
}

async function getSessionsCollection() {
  const db = (await mongoClientPromise).db();
  const sessions = db.collection("sessions");
  return sessions;
}

export async function getUserPortfolio(userId: string | string[] | undefined) {
  try {
    const portfolio = await getPortfolioCollection();
    const userPortfolio = await portfolio.findOne({ userId: userId });
    return userPortfolio;
  } catch (ex) {
    console.error("Error with getting user portfolio", ex);
    throw ex;
  }
}

export async function addUserPortfolio(
  userId: string | string[] | undefined,
  cash: number,
  stocks: Array<Holding>,
  transactions: Array<TradeRequest>
) {
  try {
    const portfolio = await getPortfolioCollection();
    if (!userId || Array.isArray(userId)) {
      throw new Error("Error with userId");
    }

    const userPortfolio = await portfolio.insertOne({
      userId,
      cash,
      stocks,
      transactions,
    });
    return userPortfolio;
  } catch (ex) {
    console.error("Error with getting user portfolio", ex);
    throw ex;
  }
}

export async function updateUserPortfolioCash(
  userId: string | string[] | undefined,
  cash: number
) {
  try {
    const portfolio = await getPortfolioCollection();
    const userPortfolio = await portfolio.findOneAndUpdate(
      { userId: userId },
      { $set: { cash: cash } },
      { returnDocument: "after" }
    );
    return userPortfolio;
  } catch (ex) {
    console.error("Error with getting user portfolio", ex);
    throw ex;
  }
}

export async function addUserTransaction(
  userId: string | string[] | undefined,
  transaction: TradeRequest
) {
  try {
    const portfolio = await getPortfolioCollection();
    const updatedDocument = await portfolio.findOneAndUpdate(
      {
        userId: userId,
      },
      { $push: { transactions: { ...transaction } } },
      { upsert: true, returnDocument: "after" }
    );
    return updatedDocument;
  } catch (ex) {
    console.error("Error with adding user transaction", ex);
    throw ex;
  }
}

export async function deleteUserPortfolio(
  userId: string | string[] | undefined
) {
  try {
    const portfolio = await getPortfolioCollection();
    const accounts = await getAccountsCollection();
    const users = await getUsersCollection();
    const sessions = await getSessionsCollection();

    if (!userId || Array.isArray(userId)) {
      throw new Error("Error with userId");
    }
    const deletedDocument = await portfolio.deleteOne({ userId: userId });
    const usersResponse = await users.deleteOne({
      _id: new ObjectId(userId),
    });
    const accountsResponse = await accounts.deleteMany({
      userId: new ObjectId(userId),
    });
    const sessionsResponse = await sessions.deleteMany({
      userId: new ObjectId(userId),
    });
    return deletedDocument;
  } catch (ex) {
    console.error("Error with deleting user portfolio", ex);
    throw ex;
  }
}
