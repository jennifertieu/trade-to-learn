import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { ReactElement, ReactNode, useState } from "react";
import InfoModal from "./Tooltip";
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
