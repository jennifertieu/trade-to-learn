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
      <section className="md:h-1/2 bg-gradient-to-r from-blue-400 to-indigo-600 text-center py-8 flex flex-col justify-center items-center">
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
      <section className="md:h-1/2 text-center flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl font-bold mt-3">About</h2>
        <p className="max-w-2xl mt-3">
          Trade to Learn is an educational application provides a unique
          opportunity for users to learn about trading stocks using real-market
          data from the free StockData API. With our platform, users can engage
          in simulated trading activities without the risk of losing real money.
        </p>
        <p className="max-w-2xl mt-3">
          Our focus is to provide an immersive learning experience where users
          can explore the world of stock trading in a safe and controlled
          environment. It is meant as a method for beginners to get started
          trading
        </p>
        <p className="max-w-2xl mt-3">
          One of the key advantages of our application is that it does not
          require any real money investment or the submission of personal
          information during the sign-up process. This ensures user privacy and
          eliminates any financial risks associated with trading.
        </p>
      </section>
    </>
  );
}
Home.noAuth = true;
