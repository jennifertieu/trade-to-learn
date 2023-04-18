import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-stretch min-h-full">
      <Navbar />
      <main className="p-6 grow shrink-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
