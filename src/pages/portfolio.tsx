import { transactions } from "@/data/transactionsExample";
import PortfolioCard from "@/components/PortfolioCard";
import { portfolioData } from "@/data/portfolioDataExample";
import Head from "next/head";
import Table from "@/components/Table";
import PortfolioProps from "@/interfaces/PortfolioProps";

const Portfolio = ({ portfolio, updatePortfolio }: PortfolioProps) => {
  return (
    <>
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
        <PortfolioCard
          portfolio={portfolio}
          updatePortfolio={updatePortfolio}
        />
        <article className="p-4 rounded-lg overflow-auto border border-neutral-400 dark:bg-neutral-800 dark:border-0">
          <h2 className="text-lg">Holdings</h2>
          <Table
            tableData={portfolioData.stocks}
            tableColumns={[
              "Name",
              "Ticker",
              "Current Price",
              "Purchase Price",
              "Quantity",
              "Day Change",
              "Total Change",
              "Total Value",
            ]}
            tableRenderRow={(data) => {
              if (data === undefined) {
                return (
                  <>
                    <td colSpan={7}>No holdings available</td>
                  </>
                );
              }

              return (
                <>
                  <td>{data["name"]}</td>
                  <td>{data["ticker"]}</td>
                  <td>
                    {(data["current_price"] as number).toLocaleString("en-US", {
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
                    {(100 / 100).toLocaleString("en-US", {
                      style: "percent",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="text-green-700 dark:text-green-400">
                    {(100 / 100).toLocaleString("en-US", {
                      style: "percent",
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>{data["total"]}</td>
                </>
              );
            }}
          />
        </article>
        <article className="p-4 rounded-lg overflow-auto border border-neutral-400 dark:bg-neutral-800 dark:border-0">
          <h2 className="text-lg">Trade History</h2>
          <Table
            tableData={transactions}
            tableColumns={[
              "Date",
              "Name",
              "Ticker",
              "Price",
              "Quantity",
              "Total Value",
            ]}
            tableRenderRow={(data) => {
              if (data === undefined) {
                return (
                  <>
                    <td colSpan={5}>No transactions available</td>
                  </>
                );
              }
              return (
                <>
                  <td>{data["date"]}</td>
                  <td>{data["name"]}</td>
                  <td>{data["ticker"]}</td>
                  <td>
                    {(data["price"] as number).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{data["quantity"]}</td>
                  <td>{data["total"]}</td>
                </>
              );
            }}
          />
        </article>
      </section>
    </>
  );
};

export default Portfolio;
