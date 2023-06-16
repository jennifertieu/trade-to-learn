import PortfolioCard from "@/components/PortfolioCard";
import Head from "next/head";
import Table from "@/components/Table";
import { useState, useEffect, useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";
import StockQuote from "@/interfaces/StockQuote";
import { getStockData } from "@/lib/stockDataApiService";
import { getStocks, upsertStocks } from "@/lib/stocksApiService";
import { PortfolioContext } from "@/context/PortfolioContext";
import InfoTip from "@/components/InfoTip";

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

  const { portfolio } = useContext(PortfolioContext);

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

  function getCurrentPrice(ticker: string) {
    for (const item of stockData) {
      if (item.ticker === ticker) {
        return item.price;
      }
    }
    return 0;
  }

  function getDayChange(ticker: string) {
    for (const item of stockData) {
      if (item.ticker === ticker) {
        return item.day_change;
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
        <article className="p-4 rounded-lg overflow-auto lg:overflow-visible border border-neutral-400 dark:bg-neutral-800 dark:border-0">
          <h2 className="text-lg">
            Holdings
            <InfoTip name="holdings" />
          </h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table
              tableData={portfolio.stocks}
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
                const dayChange = getDayChange(data["ticker"]);
                const totalChange =
                  (currentPrice * data["quantity"] -
                    data["purchase_price"] * data["quantity"]) /
                  data["purchase_price"];

                return (
                  <>
                    <td className="p-4">{data["name"]}</td>
                    <td className="p-4">{data["ticker"]}</td>
                    <td className="p-4">
                      {(currentPrice as number).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-4">
                      {(data["purchase_price"] as number).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        }
                      )}
                    </td>
                    <td className="p-4">{data["quantity"]}</td>
                    <td
                      className={
                        dayChange >= 0
                          ? "p-4 text-green-700 dark:text-green-400"
                          : "p-4 text-red-700 dark:text-red-400"
                      }
                    >
                      {dayChange.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                      %
                    </td>
                    <td
                      className={
                        totalChange >= 0
                          ? "p-4 text-green-700 dark:text-green-400"
                          : "p-4 text-red-700 dark:text-red-400"
                      }
                    >
                      {totalChange.toLocaleString("en-US", {
                        style: "percent",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-4">
                      {(data["quantity"] * currentPrice).toLocaleString(
                        "en-US",
                        {
                          style: "currency",
                          currency: "USD",
                        }
                      )}
                    </td>
                  </>
                );
              }}
            />
          )}
        </article>
        <article className="p-4 rounded-lg overflow-auto lg:overflow-visible border border-neutral-400 dark:bg-neutral-800 dark:border-0">
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
                  <td className="p-4">
                    {new Date(data["date"]).toLocaleString()}
                  </td>
                  <td className="p-4">{data["name"]}</td>
                  <td className="p-4">{data["ticker"]}</td>
                  <td className="p-4">
                    {(data["price"] as number).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="p-4">{data["quantity"]}</td>
                  <td className="p-4">{data["orderType"]}</td>
                  <td className="p-4">{data["action"]}</td>
                  <td className="p-4">
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
