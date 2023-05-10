import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { ReactNode } from "react";
import { PortfolioContextProvider } from "@/context/PortfolioContext";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-stretch h-full">
      <Navbar />
      <main className="grow shrink-0 basis-auto">
        <PortfolioContextProvider>{children}</PortfolioContextProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
