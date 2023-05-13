import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-stretch h-full">
      <Navbar />
      <main className="grow shrink-0 basis-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
