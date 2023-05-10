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

type CustomAppProps<T> = AppProps & {
  Component: NextComponentType & { auth: boolean };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
            <ToastContainer />
          </Auth>
        ) : (
          <Component {...pageProps} />
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
