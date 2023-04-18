import { useState, useEffect } from "react";
import { SyntheticEvent } from "react";

type TradeProps = {
  type: string;
};

const Trade = (tradeProps: TradeProps) => {
  const [tradeFormData, setTradeFormData] = useState({
    asset: "",
    action: "",
    quantity: "",
    orderType: "",
    duration: ""
  });

  function handleChange(event: SyntheticEvent){
    const { name, value} = event.target as HTMLInputElement;
    return setTradeFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      }
    })

  }

  function handleSubmit(event: SyntheticEvent){
    event.preventDefault();
    // TODO: submit form data to database
    console.log("submit form");
  }
  
  return (
    <article className="rounded-lg p-6 w-full lg:w-4/12 border border-neutral-400 dark:bg-neutral-800 dark:border-0">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Trade</h2>
        {tradeProps.type === "crypto" ? (
          <div className="mt-6">
            <label className="block" htmlFor="asset">Symbol</label>
            <select className="rounded-lg w-full p-2" name="asset" value={tradeFormData.asset} onChange={handleChange}>
              <option value="BTC">Bitcoin</option>
              <option value="ETH">Ethereum</option>
            </select>
          </div>
        ) : (
          <div className="mt-6">
            <label className="block" htmlFor="asset">Symbol</label>
            <select className="rounded-lg w-full p-2" name="asset" value={tradeFormData.asset} onChange={handleChange}>
              <option value="AAPL">AAPL</option>
              <option value="TSLA">TSLA</option>
              <option value="GOOG">GOOG</option>
            </select>
          </div>
        )}
        <div className="mt-6">
          <label className="block" htmlFor="action">Action</label>
          <select className="rounded-lg w-full p-2" name="action" value={tradeFormData.action} onChange={handleChange}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="quantity">Quantity</label>
          <input className="rounded-lg w-full p-2" type="number" name="quantity" value={tradeFormData.quantity} onChange={handleChange} />
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="orderType">Order Type</label>
          <select className="rounded-lg w-full p-2" name="orderType" value={tradeFormData.orderType} onChange={handleChange}>
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="duration">Duration</label>
          <select className="rounded-lg w-full p-2" name="duration" value={tradeFormData.duration} onChange={handleChange}>
            <option value="Day">Day</option>
            <option value="Until Cancelled">Until Cancelled</option>
          </select>
        </div>
        <button type="submit" className="rounded-lg bg-blue-600 dark:bg-blue-400 text-neutral-50 py-2 px-4 mt-6 w-full">Submit</button>
      </form>
    </article>
  );
};

export default Trade;
