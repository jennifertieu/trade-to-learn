import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { ReactElement, ReactNode } from "react";
import usePortfolio from "@/hooks/usePortfolio";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { portfolio, updateCash, updateUserHoldings, getUserHoldings } =
    usePortfolio();

  return (
    <div className="flex flex-col items-stretch min-h-full">
      <Navbar />
      <main className="p-6 grow shrink-0">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child as ReactElement, {
            portfolio,
            updateCash,
            updateUserHoldings,
            getUserHoldings,
          });
        })}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
