import Head from "next/head";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Trade To Learn | Welcome</title>
      </Head>
      <section className="h-1/2 bg-gradient-to-r from-blue-400 to-indigo-600 text-center flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">
          An educational trading application
        </h1>
        <p className="dark:text-neutral-200 m-3">
          A beginner friendly way to start trading
        </p>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Link
            className="rounded-lg bg-purple-500 py-2 px-4"
            href={session ? "/trade" : "/auth/signin"}
          >
            Start Trading
          </Link>
          {/* {session ? "" : <button className="rounded-lg bg-violet-400 py-2 px-4">Try Demo</button>} */}
        </div>
      </section>
      <section className="h-1/2 text-center flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mt-3">About</h2>
        <p className="max-w-lg mt-3">
          An educational application on trading stocks and cryptocurrencies
          using Polygon.io API. The user is able to trade against real-market
          data without experiencing the consquence of losing money. The purpose
          is to learn how to trade without the risk.
        </p>
      </section>
    </>
  );
}
Home.auth = false;
