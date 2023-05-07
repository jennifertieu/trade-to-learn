import { createContext, ReactNode } from "react";
import usePortfolio from "@/hooks/usePortfolio";
import PortfolioHook from "@/types/PortfolioHook";
import { portfolioData } from "@/data/portfolioDataExample";

const PortfolioContextDefault = {
  portfolio: portfolioData,
  updateCash: () => null,
  updateUserHoldings: () => null,
  getUserHoldings: () => false,
};

export const PortfolioContext = createContext<PortfolioHook>(
  PortfolioContextDefault
);

export function PortfolioContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const portfolioHook = usePortfolio();
  return (
    <PortfolioContext.Provider value={portfolioHook}>
      {children}
    </PortfolioContext.Provider>
  );
}
