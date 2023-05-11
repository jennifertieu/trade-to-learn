import { createContext, ReactNode, useState } from "react";
import { portfolioData } from "@/data/portfolioDataExample";
import Portfolio from "@/interfaces/Portfolio";

type PortfolioContextType = {
  portfolio: Portfolio;
  updateCash: (tradeTotal: number, action: string) => void;
  updateUserHoldings: (
    ticker: string,
    name: string | undefined,
    quantity: number,
    action: string
  ) => void;
  getUserHoldings: (ticker: string, quantity: number) => boolean;
};
const PortfolioContextDefault = {
  portfolio: portfolioData,
  updateCash: () => null,
  updateUserHoldings: () => null,
  getUserHoldings: () => false,
};

export const PortfolioContext = createContext<PortfolioContextType>(
  PortfolioContextDefault
);

export function PortfolioContextProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  return (
    <PortfolioContext.Provider
      value={{ portfolio, updateCash, updateUserHoldings, getUserHoldings }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
