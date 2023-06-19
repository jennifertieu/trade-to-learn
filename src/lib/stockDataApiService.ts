import StockDataQuote from "@/interfaces/StockDataQuote";

export const getStockData = async () => {
  try {
    const response = await fetch("/api/stock-quote");
    const stockData: StockDataQuote = await response.json();
    if (stockData.error) throw stockData.error;
    return stockData.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
