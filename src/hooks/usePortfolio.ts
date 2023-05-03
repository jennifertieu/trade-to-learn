import { useState } from "react";
import { portfolioData } from "@/data/portfolioDataExample";
import PortfolioProps from "@/types/PortfolioProps";
import Holdings from "@/types/Holdings";

export default function usePortfolio(): PortfolioProps {
  const [portfolio, setPortfolio] = useState(portfolioData);

  function updateCash(tradeTotal: number, action: string) {
    return setPortfolio((prevPortfolio) => {
      const cashTotal =
        action.toUpperCase() === "BUY"
          ? prevPortfolio.cash - tradeTotal
          : prevPortfolio.cash + tradeTotal;
      return {
        ...prevPortfolio,
        cash: cashTotal,
      };
    });
  }

  function updateUserHoldings(
    ticker: string,
    quantity: number,
    action: string
  ) {
    return setPortfolio((prevPortfolio) => {
      if (!getUserHoldings(ticker, quantity)) {
        prevPortfolio.stocks.push({
          name: "",
          ticker: ticker,
          current_price: 0,
          purchase_price: 0,
          quantity: quantity,
          total: 0,
        });

        return {
          ...prevPortfolio,
        };
      }
      for (let i = 0; i < prevPortfolio.stocks.length; i++) {
        const item = prevPortfolio.stocks[i];
        if (item.ticker === ticker) {
          if (action.toUpperCase() === "BUY")
            item.quantity = item.quantity + quantity;
          if (action.toUpperCase() === "SELL")
            item.quantity = item.quantity - quantity;
          if (item.quantity === 0) {
            prevPortfolio.stocks.splice(i, 1);
            return {
              ...prevPortfolio,
            };
          }
        }
      }
      return {
        ...prevPortfolio,
      };
    });
  }

  function getUserHoldings(ticker: string, quantity: number) {
    for (const item of portfolio.stocks) {
      if (item.ticker === ticker && item.quantity >= quantity) {
        return true;
      }
    }
    return false;
  }

  return { portfolio, updateCash, updateUserHoldings, getUserHoldings };
}
