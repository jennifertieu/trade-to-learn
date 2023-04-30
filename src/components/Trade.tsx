import { useState, useEffect } from "react";
import { SyntheticEvent } from "react";
import { transactions } from "@/data/transactionsExample";
import TradeRequest from "@/interfaces/TradeRequest";
import TradeQuoteData from "@/interfaces/TradeQuoteData";
import PortfolioProps from "@/interfaces/PortfolioProps";

interface TradeProps extends PortfolioProps {
  tradeQuoteData: TradeQuoteData[];
}

const Trade: React.FC<TradeProps> = ({
  tradeQuoteData,
  updatePortfolio,
  portfolio,
}) => {
  const [tradeFormData, setTradeFormData] = useState({
    ticker: "",
    action: "",
    quantity: 0,
    orderType: "",
    duration: "",
  });

  function handleChange(event: SyntheticEvent) {
    const { name, value } = event.target as HTMLInputElement;
    return setTradeFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const tradeQuote = getTradeDetails(tradeFormData.ticker);
    const name = tradeQuote?.name;
    const price = tradeQuote?.price ? tradeQuote.price : 0;
    // TODO: If action is to sell, verify the user owns that amount of select assets
    // TODO: submit form data to database
    transactions.push({
      ...tradeFormData,
      name,
      total: tradeFormData.quantity * price,
      date: new Date().toISOString(),
      price,
    } as TradeRequest);
    // update portfolio
    updatePortfolio(tradeFormData.quantity * price, tradeFormData.action);
  }

  function getTradeDetails(ticker: string) {
    for (const quoteData of tradeQuoteData) {
      if (quoteData.ticker === ticker) {
        return quoteData;
      }
    }
  }

  function getUserHoldings() {}

  return (
    <article className="rounded-lg p-6 w-full lg:w-4/12 border border-neutral-400 dark:bg-neutral-800 dark:border-0">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg">Trade</h2>
        <div className="mt-6">
          <label className="block" htmlFor="ticker">
            Symbol
          </label>
          <select
            className="rounded-lg w-full p-2"
            name="ticker"
            value={tradeFormData.ticker}
            onChange={handleChange}
            required
          >
            <option value="">Please select an asset</option>
            {tradeQuoteData.map((data, index) => (
              <option value={data.ticker} key={index}>
                {data.ticker} - {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="action">
            Action
          </label>
          <select
            className="rounded-lg w-full p-2"
            name="action"
            value={tradeFormData.action}
            onChange={handleChange}
            required
          >
            <option value="">Please choose an action</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="rounded-lg w-full p-2"
            type="number"
            name="quantity"
            value={tradeFormData.quantity}
            onChange={handleChange}
            required
            min={0}
          />
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="orderType">
            Order Type
          </label>
          <select
            className="rounded-lg w-full p-2"
            name="orderType"
            value={tradeFormData.orderType}
            onChange={handleChange}
            required
          >
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="duration">
            Duration
          </label>
          <select
            className="rounded-lg w-full p-2"
            name="duration"
            value={tradeFormData.duration}
            onChange={handleChange}
            required
          >
            <option value="Day">Day</option>
            <option value="Until Cancelled">Until Cancelled</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 dark:bg-blue-400 text-neutral-50 py-2 px-4 mt-6 w-full"
        >
          Submit
        </button>
      </form>
    </article>
  );
};

export default Trade;
