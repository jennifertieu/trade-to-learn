import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { NextComponentType } from "next";
import { ReactNode } from "react";
import { PortfolioContextProvider } from "@/context/PortfolioContext";
import { QueryClient, QueryClientProvider } from "react-query";

type CustomAppProps<T> = AppProps & {
  Component: NextComponentType & { noAuth?: boolean };
};

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.noAuth ? (
          <Component {...pageProps} />
        ) : (
          <Auth>
            <QueryClientProvider client={queryClient}>
              <PortfolioContextProvider>
                <Component {...pageProps} />
              </PortfolioContextProvider>
              <ToastContainer />
            </QueryClientProvider>
          </Auth>
        )}
      </Layout>
    </SessionProvider>
  );
}

function Auth({ children }: { children: ReactNode }) {
  const router = useRouter();
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      return router.push("/");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
