import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-stretch h-full overflow-auto">
      <Navbar />
      <main className="grow shrink-0 basis-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
