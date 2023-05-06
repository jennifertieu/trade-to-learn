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
