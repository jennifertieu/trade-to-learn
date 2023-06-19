import type { Session } from "next-auth";
import Holding from "@/types/Holding";

export const getUserStocks = async (session: Session) => {
  try {
    const response = await fetch(`api/portfolio/${session.user.id}/stocks`);
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const upsertUserStock = async (session: Session, stockData: Holding) => {
  try {
    const upsertRequestBody = {
      filter: {
        userId: session.user.id,
        stocks: {
          $elemMatch: {
            ticker: stockData.ticker,
          },
        },
      },
      update: {
        $set: {
          "stocks.$.name": stockData.name,
          "stocks.$.ticker": stockData.ticker,
          "stocks.$.purchase_price": stockData.purchase_price,
          "stocks.$.quantity": stockData.quantity,
        },
      },
      insert: {
        $push: { stocks: stockData },
      },
      options: {
        upsert: true,
        returnDocument: "after",
      },
    };

    const response = await fetch(`api/portfolio/${session.user.id}/stocks`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upsertRequestBody),
    });
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const deleteUserStock = async (session: Session, ticker: string) => {
  try {
    const deleteRequestBody = {
      filter: {
        userId: session.user.id,
        stocks: {
          $elemMatch: {
            ticker: ticker,
          },
        },
      },
      update: {
        $pull: { stocks: { ticker } },
      },
      options: {
        returnDocument: "after",
      },
    };

    const response = await fetch(`api/portfolio/${session.user.id}/stocks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteRequestBody),
    });
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
