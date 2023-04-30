import { useState, useEffect } from "react";
import Head from "next/head";
import Trade from "@/components/Trade";
import PortfolioCard from "@/components/PortfolioCard";
import { cryptoData } from "@/data/cryptoDataExample";
import Portfolio from "@/interfaces/Portfolio";
import Table from "@/components/Table";

const Crypto = ({ portfolio, updatePortfolio }: Portfolio) => {
  const [cryptoDailyData, setCryptoDailyData] = useState(cryptoData);
  // useEffect(() => {
  //   const fetchData = async() => {
  //     const response = await fetch("/api/open-close");
  //     const data = await response.json();
  //     setStockDailyData(data);
  //   }
  //   fetchData();
  // }, [])

  return (
    <>
      <Head>
        <title>Trade To Learn | Crypto</title>
      </Head>
      <section>
        <h1 className="text-2xl font-bold">Crypto</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">
          Trading cryptocurrency
        </p>
      </section>
      <section className="flex flex-col gap-4 mt-4 lg:flex-row">
        <section className="flex flex-col gap-4 grow">
          <PortfolioCard
            portfolio={portfolio}
            updatePortfolio={updatePortfolio}
          />
          <article className="p-4 rounded-lg overflow-auto border border-neutral-400 dark:bg-neutral-800 dark:border-0">
            <h2 className="text-lg font-semibold">Quotes</h2>
            <Table
              tableData={cryptoData}
              tableColumns={["Name", "Ticker", "Price", "Day Change"]}
              tableRenderRow={(data) => {
                if (data === undefined) {
                  return (
                    <>
                      <td colSpan={4}>No data available</td>
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
                    <td className="text-green-700 dark:text-green-400">
                      {(100 / 100).toLocaleString("en-US", {
                        style: "percent",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </>
                );
              }}
            />
          </article>
        </section>
        <Trade
          updatePortfolio={updatePortfolio}
          tradeQuoteData={cryptoData.map(({ name, ticker, price }) => ({
            name,
            ticker,
            price,
          }))}
        />
      </section>
    </>
  );
};

export default Crypto;
