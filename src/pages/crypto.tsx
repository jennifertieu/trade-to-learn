import { useState, useEffect } from "react";
import Head from "next/head";
import Trade from "@/components/Trade";

const Crypto = () => {
  const [cryptoDailyData, setCryptoDailyData] = useState(null);

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
        <Trade type="crypto" />
        {/* {
          data ?
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
                <tr>
                  <td>{data["symbol"]}</td>
                  <td>{data["close"]}</td>
                  <td>{data["high"]}</td>
                  <td>{data["low"]}</td>
                  <td>{data["open"]}</td>
                </tr>
              </tbody>
            </table> : <div>Loading...</div> 
        } */}
      </section>
    </>
  );
};

export default Crypto;
