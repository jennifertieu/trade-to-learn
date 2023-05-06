import { createContext, ReactNode } from "react";
import usePortfolio from "@/hooks/usePortfolio";
import PortfolioProps from "@/types/PortfolioProps";

export const PortfolioContext = createContext<PortfolioProps>(null);

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
