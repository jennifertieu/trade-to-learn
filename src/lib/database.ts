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

async function getStocksCollection() {
  const db = (await mongoClientPromise).db();
  const stocks = db.collection("stocks");
  return stocks;
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

export async function upsertUserStock(
  userId: string | string[] | undefined,
  name: string,
  ticker: string,
  quantity: number,
  purchase_price: number
) {
  try {
    const portfolio = await getPortfolioCollection();
    const filter = {
      userId: userId,
      stocks: {
        $elemMatch: {
          ticker: ticker,
        },
      },
    };
    const existingStock = await portfolio.findOne(filter);
    if (existingStock) {
      const updatedDocument = await portfolio.findOneAndUpdate(filter, {
        $set: {
          "stocks.$.name": name,
          "stocks.$.ticker": ticker,
          "stocks.$.purchase_price": purchase_price,
          "stocks.$.quantity": quantity,
        },
      });
      return updatedDocument;
    }

    await portfolio.updateOne(
      { userId: userId },
      {
        $push: { stocks: { name, purchase_price, ticker, quantity } },
      }
    );
    const updatedStockHoldings = await portfolio.findOne(filter);
    return updatedStockHoldings;
  } catch (ex) {
    console.error("Error with updating user stock information", ex);
    throw ex;
  }
}

export async function deleteUserStock(
  userId: string | string[] | undefined,
  ticker: string
) {
  try {
    const portfolio = await getPortfolioCollection();
    const response = await portfolio.findOneAndUpdate(
      {
        userId: userId,
        stocks: {
          $elemMatch: {
            ticker: ticker,
          },
        },
      },
      {
        $pull: { stocks: { ticker } },
      },
      {
        returnDocument: "after",
      }
    );
    return response;
  } catch (ex) {
    console.error("Error in deleting user stock holding", ex);
    throw ex;
  }
}

export async function getStockQuotes() {
  try {
    const stocks = await getStocksCollection();
    const response = stocks.find({}).toArray();
    return response;
  } catch (ex) {
    console.error("Error in getting stock data from the database", ex);
    throw ex;
  }
}
