import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { ReactNode } from "react";
import { PortfolioContextProvider } from "@/context/PortfolioContext";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-stretch min-h-full">
      <Navbar />
      <main className="p-6 grow shrink-0">
        <PortfolioContextProvider>{children}</PortfolioContextProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
