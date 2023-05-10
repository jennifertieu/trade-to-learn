import PortfolioCard from "@/components/PortfolioCard";
import { portfolioData } from "@/data/portfolioDataExample";
import Head from "next/head";
import Table from "@/components/Table";
import { useState, useEffect, useContext } from "react";
import { stockData } from "@/data/stockDataExample";
import StockDataQuote from "@/interfaces/StockDataQuote";
import StockQuote from "@/interfaces/StockQuote";
import { PortfolioContext } from "@/context/PortfolioContext";

export default function Portfolio() {
  const transactionColumns = [
    "Date",
    "Name",
    "Ticker",
    "Price",
    "Quantity",
    "Order Type",
    "Action",
    "Total",
  ];

  const holdingsColumns = [
    "Name",
    "Ticker",
    "Current Price",
    "Purchase Price",
    "Quantity",
    "Day Change",
    "Total Change",
    "Total Value",
  ];

  const [stockDailyData, setStockDailyData] = useState(stockData);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [stockDataSource, setStockDataSource] = useState("StockData API");
  const { portfolio } = useContext(PortfolioContext);

  useEffect(() => {
    // const fetchStockData = async () => {
    //   try {
    //     const response = await fetch("/api/stock-quote");
    //     const stockData: StockDataQuote = await response.json();
    //     if (stockData.error) throw stockData.error;
    //     setStockDailyData(stockData.data as StockQuote[]);
    //   } catch (ex) {
    //     setStockDataSource("Database, StockData API Limit Exceeded :(");
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

  function getCurrentPrice(ticker: string) {
    for (const item of stockDailyData) {
      if (item.ticker === ticker) {
        return item.price;
      }
    }
    return 0;
  }

  return (
    <section className="p-4">
      <Head>
        <title>Trade To Learn | Portfolio</title>
      </Head>
      <section>
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          Account Overview
        </p>
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <PortfolioCard />
        <article className="p-4 rounded-lg overflow-auto md:overflow-visible border border-neutral-400 dark:bg-neutral-800 dark:border-0">
          <h2 className="text-lg">Holdings</h2>
          <Table
            tableData={portfolioData.stocks}
            tableColumns={holdingsColumns}
            tableRenderRow={(data) => {
              if (data === undefined) {
                return (
                  <>
                    <td colSpan={holdingsColumns.length}>
                      No holdings available
                    </td>
                  </>
                );
              }

              const currentPrice = getCurrentPrice(data["ticker"]);
              const totalChange =
                currentPrice * data["quantity"] -
                data["purchase_price"] * data["quantity"];

              return (
                <>
                  <td>{data["name"]}</td>
                  <td>{data["ticker"]}</td>
                  <td>
                    {(currentPrice as number).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    {(data["purchase_price"] as number).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>
                  <td>{data["quantity"]}</td>
                  <td className="text-green-700 dark:text-green-400">
                    {(
                      (currentPrice - data["purchase_price"]) /
                      data["purchase_price"]
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                    %
                  </td>
                  <td
                    className={
                      totalChange < 0
                        ? "text-red-700 dark:text-red-400"
                        : "text-green-700 dark:text-green-400"
                    }
                  >
                    {totalChange.toLocaleString("en-US", {
                      style: "percent",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    {(data["quantity"] * currentPrice).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                </>
              );
            }}
          />
        </article>
        <article className="p-4 rounded-lg overflow-auto md:overflow-visible border border-neutral-400 dark:bg-neutral-800 dark:border-0">
          <h2 className="text-lg">Trade History</h2>
          <Table
            tableData={portfolio.transactions}
            tableColumns={transactionColumns}
            tableRenderRow={(data) => {
              if (data === undefined) {
                return (
                  <>
                    <td colSpan={transactionColumns.length}>
                      No transactions available
                    </td>
                  </>
                );
              }
              return (
                <>
                  <td>{new Date(data["date"]).toUTCString()}</td>
                  <td>{data["name"]}</td>
                  <td>{data["ticker"]}</td>
                  <td>
                    {(data["price"] as number).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>{data["quantity"]}</td>
                  <td>{data["orderType"]}</td>
                  <td>{data["action"]}</td>
                  <td>
                    {data["total"].toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </>
              );
            }}
          />
        </article>
      </section>
    </section>
  );
}

Portfolio.auth = true;
