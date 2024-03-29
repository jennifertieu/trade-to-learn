import { createContext, ReactNode, useState } from "react";
import Portfolio from "@/interfaces/Portfolio";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import Holding from "@/types/Holding";
import TradeRequest from "@/interfaces/TradeRequest";
import { fetchUserPortfolio } from "@/lib/portfolio";

const portfolioDataDefault: Portfolio = {
  cash: 0,
  stocks: [],
  transactions: [],
};

type PortfolioContextType = {
  portfolio: Portfolio;
  updatePortfolio: (portfolio: Portfolio) => void;
  doesUserOwnStock: (ticker: string) => boolean;
  hasSufficientStockForSale: (ticker: string, quantity: number) => boolean;
};

const PortfolioContextDefault = {
  portfolio: portfolioDataDefault,
  updatePortfolio: () => null,
  doesUserOwnStock: () => false,
  hasSufficientStockForSale: () => false,
};

export const PortfolioContext = createContext<PortfolioContextType>(
  PortfolioContextDefault
);

export function PortfolioContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [portfolio, setPortfolio] = useState(portfolioDataDefault);
  const { data: session } = useSession();

  const { isLoading } = useQuery("portfolio", async () => {
    try {
      const response = await fetch(`/api/portfolio/${session?.user.id}`);
      const userPortfolio = await response.json();
      setPortfolio(userPortfolio);
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  });

  function updatePortfolio(portfolio: Portfolio) {
    return setPortfolio(portfolio);
  }

  function doesUserOwnStock(ticker: string) {
    for (const item of portfolio.stocks) {
      if (item.ticker === ticker) {
        return true;
      }
    }
    return false;
  }

  function hasSufficientStockForSale(ticker: string, quantity: number) {
    for (const item of portfolio.stocks) {
      if (item.ticker === ticker && item.quantity >= quantity) {
        return true;
      }
    }
    return false;
  }

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        updatePortfolio,
        doesUserOwnStock,
        hasSufficientStockForSale,
      }}
    >
      {isLoading ? (
        <div className="animate-pulse flex justify-center items-center w-full h-full text-xl">
          Portfolio Loading...
        </div>
      ) : (
        <>{children}</>
      )}
    </PortfolioContext.Provider>
  );
}
