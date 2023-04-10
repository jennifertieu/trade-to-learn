import { useState } from "react";

type TradeProps = {
  type: string;
};

const Trade = (tradeProps: TradeProps) => {
  return (
    <article>
      <form>
        <h2>Trade</h2>
        {tradeProps.type === "crypto" ? (
          <div>
            <label>Symbol</label>
            <select name="asset">
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
            </select>
          </div>
        ) : (
          <div>
            <label>Symbol</label>
            <select name="asset">
              <option value="AAPL">AAPL - Apple</option>
              <option value="TSLA">Tesla</option>
              <option value="WAL">Walmart</option>
            </select>
          </div>
        )}
        <div>
          <label>Action</label>
          <select name="action">
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" name="quantity" />
        </div>
        <div>
          <label>Order Type</label>
          <input type="text" name="orderType" />
        </div>
        <div>
          <label>Duration</label>
          <input type="text" name="duration" />
        </div>
      </form>
    </article>
  );
};

export default Trade;
