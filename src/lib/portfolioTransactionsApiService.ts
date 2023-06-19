import TradeRequest from "@/interfaces/TradeRequest";
import type { Session } from "next-auth";

export const getUserTransactions = async (session: Session | null) => {
  try {
    const response = await fetch(
      `api/portfolio/${session?.user.id}/transactions`
    );
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const addUserTransactions = async (
  session: Session | null,
  transaction: TradeRequest
) => {
  try {
    const response = await fetch(
      `api/portfolio/${session?.user.id}/transactions`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            userId: session?.user.id,
          },
          update: {
            $push: {
              transactions: {
                ...transaction,
              },
            },
          },
          options: { upsert: true, returnDocument: "after" },
        }),
      }
    );
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
