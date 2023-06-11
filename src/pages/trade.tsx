import Head from "next/head";
import PortfolioCard from "@/components/PortfolioCard";
import TradeForm from "@/components/TradeForm";
import Table from "@/components/Table";
import StockQuote from "@/interfaces/StockQuote";
import { useQuery, UseQueryResult } from "react-query";
import { getStockData } from "@/lib/stockDataApiService";
import { getStocks, upsertStocks } from "@/lib/stocksApiService";

export default function Trade() {
  const stockQuoteColumns = ["Name", "Ticker", "Price", "Day Change"];

  const { data, isLoading, error }: UseQueryResult<StockQuote[], Error> =
    useQuery("stockData", async () => {
      try {
        let stockData = await getStockData();
        await upsertStocks(stockData);
        return stockData;
      } catch (ex) {
        console.log(ex);
        let stockData = await getStocks();
        return stockData;
      }
    });

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const stockData = data ? data : [];

  return (
    <section className="p-4">
      <Head>
        <title>Trade To Learn | Trade </title>
      </Head>
      <section>
        <h1 className="text-3xl font-bold">Trade</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          Trading Common Stocks
        </p>
      </section>
      <section className="flex flex-col gap-4 mt-4 lg:flex-row">
        <section className="flex flex-col gap-4 grow">
          <PortfolioCard />
          <article className="p-4 rounded-lg overflow-auto lg:overflow-visible border border-neutral-400 dark:bg-neutral-800 dark:border-0">
            <h2 className="text-lg">Quotes</h2>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Table
                tableData={stockData}
                tableColumns={stockQuoteColumns}
                tableRenderRow={(data) => {
                  if (data === undefined) {
                    return (
                      <>
                        <td colSpan={stockQuoteColumns.length}>
                          No data available
                        </td>
                      </>
                    );
                  }
                  return (
                    <>
                      <td>{data["name"]}</td>
                      <td>{data["ticker"]}</td>
                      <td>
                        {data["price"].toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td
                        className={
                          data["day_change"] < 0
                            ? "text-red-700 dark:text-red-400"
                            : "text-green-700 dark:text-green-400"
                        }
                      >
                        {data["day_change"].toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                        %
                      </td>
                    </>
                  );
                }}
              />
            )}
          </article>
        </section>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <TradeForm
            tradeQuoteData={stockData.map(({ name, ticker, price }) => ({
              name,
              ticker,
              price,
            }))}
          />
        )}
      </section>
    </section>
  );
}
