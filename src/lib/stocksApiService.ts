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
          upsert: true,
        },
      };
    });

    const response = await fetch("api/stocks", {
      method: "PATCH",
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
