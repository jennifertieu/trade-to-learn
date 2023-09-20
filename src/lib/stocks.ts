import { getStockQuotes, upsertStockQuotes } from "./database";
import StockDataQuote from "@/interfaces/StockDataQuote";

export async function fetchStockQuoteData() {
  try {
    const stockDataResponse = await fetch(
      `${process.env.STOCK_DATA_URL}/quote?symbols=AAPL,GOOG,AMZN&api_token=${process.env.STOCK_DATA_API_KEY}`
    );
    const stockDataQuote: StockDataQuote = await stockDataResponse.json();
    if (stockDataQuote.error || !stockDataQuote.data) {
      // issue with stock data api or limit is reached
      console.log(stockDataQuote.error);
      // fallback to stocks in database
      const stockQuoteData = await getStockQuotes();
      return stockQuoteData;
    }
    // update stocks in database
    await upsertStockQuotes(stockDataQuote.data);
    return stockDataQuote.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}
