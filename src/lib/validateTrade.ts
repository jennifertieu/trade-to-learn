import Portfolio from "@/interfaces/Portfolio";
import TradeQuoteData from "@/interfaces/TradeQuoteData";

export function getQuoteDetails(
  ticker: string,
  tradeQuoteData: TradeQuoteData[]
) {
  for (const quoteData of tradeQuoteData) {
    if (quoteData.ticker === ticker) {
      return quoteData;
    }
  }
}

export function getUserHoldings(
  ticker: string,
  quantity: number,
  portfolio: Portfolio
) {
  for (const item of portfolio.stocks) {
    if (item.ticker === ticker && item.quantity >= quantity) {
      return true;
    }
  }
  return false;
}
