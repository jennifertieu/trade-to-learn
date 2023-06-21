import { createContext, ReactNode, useState } from "react";
import Portfolio from "@/interfaces/Portfolio";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { getUserPortfolio, addUserPortfolio } from "@/lib/portfolioApiService";
import Holding from "@/types/Holding";
import TradeRequest from "@/interfaces/TradeRequest";

const portfolioDataDefault: Portfolio = {
  cash: 0,
  stocks: [],
  transactions: [],
};

type PortfolioContextType = {
  portfolio: Portfolio;
  updateCash: (cash: number) => void;
  updateUserHoldings: (stockHoldings: Holding[]) => void;
  addTransaction: (trades: TradeRequest[]) => void;
  doesUserOwnStock: (ticker: string) => boolean;
  hasSufficientStockForSale: (ticker: string, quantity: number) => boolean;
};

const PortfolioContextDefault = {
  portfolio: portfolioDataDefault,
  updateCash: () => null,
  updateUserHoldings: () => null,
  addTransaction: () => null,
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
      let userPortfolio = await getUserPortfolio(session);
      if (!userPortfolio) {
        userPortfolio = await addUserPortfolio(session);
      }
      setPortfolio(userPortfolio);
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  });

  function updateCash(cash: number) {
    return setPortfolio((prevPortfolio) => {
      return {
        ...prevPortfolio,
        cash: cash,
      };
    });
  }

  function updateUserHoldings(stockHoldings: Holding[]) {
    return setPortfolio((prevPortfolio) => {
      return {
        ...prevPortfolio,
        stocks: stockHoldings,
      };
    });
  }

  function addTransaction(trades: TradeRequest[]) {
    return setPortfolio((prevPortfolio) => {
      return {
        ...prevPortfolio,
        transactions: trades,
      };
    });
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
        updateCash,
        updateUserHoldings,
        addTransaction,
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
