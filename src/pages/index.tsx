import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Trade from "@/components/Trade";

export default function Home() {
  const [stockDailyData, setStockDailyData] = useState(null);
  const stockData = [
    {
      symbol: "AAPL",
      close: 161.23,
      high: 165.25,
      low: 160.21,
      open: 161,
    },
    {
      symbol: "GOOG",
      close: 161.23,
      high: 165.25,
      low: 160.21,
      open: 161,
    },
    {
      symbol: "AMZN",
      close: 161.23,
      high: 165.25,
      low: 160.21,
      open: 161,
    },
  ];

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
        <title>Trade To Learn</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="grid grid-cols-3">
        <div className="col-span-2 row-1">
          <h1>Stocks</h1>
          <p>Trading Common Stocks</p>
        </div>
        <section className="col-span-2">
          <article>
            <h2>Portfolio</h2>
            <p>$10,000</p>
          </article>
          {stockData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Close Price</th>
                  <th>Highest Price</th>
                  <th>Lowest Price</th>
                  <th>Open Price</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((data, index) => (
                  <tr key={index}>
                    <td>{data["symbol"]}</td>
                    <td>{data["close"]}</td>
                    <td>{data["high"]}</td>
                    <td>{data["low"]}</td>
                    <td>{data["open"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Loading...</div>
          )}
        </section>
        <div className="col-span-1">
          <Trade type="stock" />
        </div>
      </section>
    </>
  );
}
