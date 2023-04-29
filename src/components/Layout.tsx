import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { ReactElement, ReactNode, useState } from "react";
import { portfolioData } from "@/data/portfolioDataExample";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [portfolio, setPortfolio] = useState(portfolioData);

  function updatePortfolio(tradeTotal: number, action: string) {
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

  return (
    <div className="flex flex-col items-stretch min-h-full">
      <Navbar />
      <main className="p-6 grow shrink-0">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as ReactElement, {
            portfolio,
            updatePortfolio,
          });
        })}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
