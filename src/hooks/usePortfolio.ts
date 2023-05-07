import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolioDataExample";
import PortfolioHook from "@/types/PortfolioHook";

export default function usePortfolio(
  defaultPortfolioData = portfolioData
): PortfolioHook {
  const [portfolio, setPortfolio] = useState(defaultPortfolioData);

  // TODO: set portfolio data from database if the use is logged in

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
    name: string | undefined,
    quantity: number,
    action: string
  ) {
    return setPortfolio((prevPortfolio) => {
      if (!getUserHoldings(ticker, quantity)) {
        const initialPurchasePrice = portfolio.transactions.filter(
          (item) => item.ticker === ticker
        )[0].price;
        prevPortfolio.stocks.push({
          name: name ? name : "",
          ticker: ticker,
          purchase_price: initialPurchasePrice,
          quantity: quantity,
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
          item.purchase_price = calculateAveragePrice(ticker);
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

  function calculateAveragePrice(ticker: string) {
    const filterPortfolio = portfolio.transactions.filter(
      (item) => item.ticker === ticker
    );
    const prices = filterPortfolio.map((item) => item.price);
    const sumPrices = prices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sumPrices / prices.length;
  }

  return { portfolio, updateCash, updateUserHoldings, getUserHoldings };
}
