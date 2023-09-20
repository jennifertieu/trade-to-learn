import Head from "next/head";
import PortfolioCard from "@/components/PortfolioCard";
import TradeForm from "@/components/TradeForm";
import Table from "@/components/Table";
import StockQuote from "@/interfaces/StockQuote";
import { useQuery, UseQueryResult } from "react-query";
import InfoTip from "@/components/InfoTip";

export default function Trade() {
  const stockQuoteColumns = ["Name", "Ticker", "Current Price", "Day Change"];

  const { data, isLoading, error }: UseQueryResult<StockQuote[], Error> =
    useQuery("stockData", async () => {
      try {
        const response = await fetch("/api/stocks");
        const stockQuoteData = await response.json();
        return stockQuoteData;
      } catch (ex) {
        console.log(ex);
        throw ex;
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
        <h1 className="text-3xl font-bold" data-testid="trade">
          Trade
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          Trading Common Stocks
        </p>
      </section>
      <section className="flex flex-col gap-4 mt-4 lg:flex-row">
        <section className="flex flex-col gap-4 grow">
          <PortfolioCard />
          <article className="p-4 rounded-lg overflow-auto md:overflow-visible border border-neutral-400 dark:bg-neutral-800 dark:border-0">
            <h2 className="text-lg">
              Quotes
              <InfoTip name="Quote" />
            </h2>
            {isLoading ? (
              <div className="animate-pulse py-4 text-center">Loading...</div>
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
                      <td className="p-4">{data["name"]}</td>
                      <td className="p-4">{data["ticker"]}</td>
                      <td className="p-4">
                        {data["price"].toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td
                        className={
                          data["day_change"] < 0
                            ? "p-4 text-red-700 dark:text-red-400"
                            : "p-4 text-green-700 dark:text-green-400"
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
          <article className="rounded-lg p-6 w-full lg:w-4/12 border border-neutral-400 dark:bg-neutral-800 dark:border-0">
            <h2 className="text-lg">Trade</h2>
            <div className="animate-pulse py-4 text-center h-full flex justify-center items-center">
              Loading...
            </div>
          </article>
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
