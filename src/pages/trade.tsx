import Head from "next/head";
import Image from "next/image";
import PortfolioCard from "@/components/PortfolioCard";
import { useState, useEffect, useContext } from "react";
import TradeForm from "@/components/TradeForm";
import dynamic from "next/dynamic";
import Table from "@/components/Table";
import StockQuote from "@/interfaces/StockQuote";
import StockDataQuote from "@/interfaces/StockDataQuote";
import { stockData } from "@/data/stockDataExample";
const SymbolOverviewNoSSR = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.SymbolOverview),
  {
    ssr: false,
  }
);

export default function Trade() {
  const [stockDailyData, setStockDailyData] = useState(stockData);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const stockQuoteColumns = ["Name", "Ticker", "Price", "Day Change"];

  // TODO: if logged in, use API data. else use fake data

  useEffect(() => {
    // const fetchStockData = async () => {
    //   try {
    //     const response = await fetch("/api/stock-quote");
    //     const stockData: StockDataQuote = await response.json();
    //     if (stockData.error) throw stockData.error;
    //     setStockDailyData(stockData.data as StockQuote[]);
    //   } catch (ex) {
    //     throw ex;
    //   }
    // };

    // const getQuoteData = async () => {
    //   try {
    //     await fetchStockData();
    //   } catch (ex) {
    //     console.log(ex);
    //     // TODO: update database, use as fallback if the API free plan maxes out
    //   }
    // };

    // getQuoteData();

    setCurrentDateTime(new Date().toLocaleString());
  }, []);

  return (
    <>
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
            <Table
              tableData={stockDailyData}
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
            <div className="flex justify-between text-neutral-800 dark:text-neutral-400">
              <small className="">Last updated at {currentDateTime}</small>
            </div>
          </article>
        </section>
        <TradeForm
          tradeQuoteData={stockDailyData.map(({ name, ticker, price }) => ({
            name,
            ticker,
            price,
          }))}
        />
      </section>
    </>
  );
}

Trade.auth = true;
