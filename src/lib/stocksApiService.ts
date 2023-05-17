import StockQuote from "@/interfaces/StockQuote";

export const getStocks = async () => {
  try {
    const response = await fetch("api/stocks");
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const upsertStocks = async (stockData: StockQuote[] | undefined) => {
  try {
    const stocks = await getStocks();
    if (!stocks || stocks.length === 0) {
      const response = await addStocks(stockData);
      return response;
    }
    const response = await updateStocks(stockData);
    return response;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const addStocks = async (stockData: StockQuote[] | undefined) => {
  try {
    const response = await fetch("api/stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockData),
    });
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const updateStocks = async (stockData: StockQuote[] | undefined) => {
  try {
    if (typeof stockData === undefined) {
      return undefined;
    }

    const formatData = stockData?.map((stock) => {
      return {
        updateOne: {
          filter: { ticker: stock.ticker },
          update: {
            $set: {
              ...stock,
            },
          },
        },
      };
    });

    const response = await fetch("api/stocks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatData),
    });

    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
