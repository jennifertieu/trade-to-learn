import { useState } from "react";

type TradeProps = {
  type: string;
};

const Trade = (tradeProps: TradeProps) => {
  return (
    <article className="rounded-lg p-6 w-full sm:w-4/12 border border-neutral-400 dark:bg-neutral-800 dark:border-0">
      <form>
        <h2 className="text-xl font-semibold">Trade</h2>
        {tradeProps.type === "crypto" ? (
          <div className="mt-6">
            <label className="block" htmlFor="asset">Symbol</label>
            <select className="rounded-lg w-full p-2" name="asset">
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
            </select>
          </div>
        ) : (
          <div className="mt-6">
            <label className="block" htmlFor="asset">Symbol</label>
            <select className="rounded-lg w-full p-2" name="asset">
              <option value="AAPL">AAPL</option>
              <option value="TSLA">TSLA</option>
              <option value="GOOG">GOOG</option>
            </select>
          </div>
        )}
        <div className="mt-6">
          <label className="block" htmlFor="action">Action</label>
          <select className="rounded-lg w-full p-2" name="action">
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="quantity">Quantity</label>
          <input className="rounded-lg w-full p-2" type="number" name="quantity" />
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="orderType">Order Type</label>
          <input className="rounded-lg w-full p-2" type="text" name="orderType" />
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="duration">Duration</label>
          <input className="rounded-lg w-full p-2" type="text" name="duration" />
        </div>
        <button className="rounded-lg bg-blue-600 dark:bg-blue-400 text-neutral-50 py-2 px-4 mt-6 w-full">Submit</button>
      </form>
    </article>
  );
};

export default Trade;
