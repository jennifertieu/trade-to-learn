import {
  addUserTransaction,
  getStockQuotes,
  getUserPortfolio,
  upsertUserStock,
  deleteUserStock,
  updateUserPortfolioCash,
} from "./database";
import { calculateUserTrade, calculateUserCash } from "@/lib/tradeHelpers";

export async function makeTrade(
  userId: string | string[] | undefined,
  ticker: string,
  action: string,
  quantity: number,
  orderType: string,
  duration: string
) {
  try {
    // get quote details
    const stockQuotes = await getStockQuotes();
    const tradeQuote = stockQuotes.filter((quote) => quote.ticker === ticker);
    if (tradeQuote.length <= 0) {
      throw new Error("No trade quote for stock found");
    }
    const { name, price } = tradeQuote[0];

    // add user transaction
    await addUserTransaction(userId, {
      ticker,
      name,
      date: new Date().toISOString(),
      total: price * quantity,
      duration,
      price,
      quantity,
      orderType,
      action,
    });

    const portfolio = await getUserPortfolio(userId);
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }
    // calculate user trade
    const trade = calculateUserTrade(
      portfolio,
      name,
      ticker,
      quantity,
      price,
      action
    );

    // update user holdings
    if (trade?.quantity === 0) {
      await deleteUserStock(userId, ticker);
    } else {
      await upsertUserStock(
        userId,
        name,
        ticker,
        trade.quantity,
        trade.purchase_price
      );
    }
    // update user portfolio
    const cashCalculated = calculateUserCash(
      portfolio.cash,
      quantity * price,
      action
    );

    await updateUserPortfolioCash(userId, cashCalculated);

    const portolioUpdated = await getUserPortfolio(userId);
    return portolioUpdated;
  } catch (ex) {
    console.error("Error with making trade", ex);
    throw ex;
  }
}
