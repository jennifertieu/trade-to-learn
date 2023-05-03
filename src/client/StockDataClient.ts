export async function getStockQuote() {
  try {
    const response = await fetch(
      `${process.env.STOCK_DATA_URL}/quote?symbols=AAPL,GOOG,AMZN&api_token=${process.env.STOCK_DATA_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (ex) {
    console.log(ex);
  }
}
