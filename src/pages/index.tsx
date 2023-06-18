import Head from "next/head";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Trade To Learn | Welcome</title>
      </Head>
      <section className="text-center py-8 flex flex-col justify-center items-center gap-2 bg-blue-600">
        <h1 className="climate-crisis-font text-5xl font-bold uppercase text-black">
          Welcome
        </h1>
        <p className="text-black m-3">
          A beginner friendly way to start trading
        </p>
        <Link
          className="rounded-lg bg-violet-500 text-white py-2 px-4"
          href={session ? "/trade" : "/auth/signin"}
        >
          Start Trading
        </Link>
        <Image
          src="/img/hero-image.png"
          alt="Trading Preview"
          width={1000}
          height={700}
          className="px-2"
        />
      </section>
      <section className="flex flex-col items-center p-4 text-black mt-10">
        <h2 className="text-xl font-bold mt-3 text-white">About</h2>
        <div className="flex gap-4 max-w-5xl flex-col md:flex-row">
          <p className="climate-crisis-font mt-3 text-2xl md:w-1/2 p-4">
            An easy way to get started trading without the risk of losing real
            money.
          </p>
          <p className="mt-3 p-4 md:w-1/2">
            Trade to Learn is an educational application to help beginners to
            learn about trading stocks using real-market data. Our application
            is that it does not require any real money investment or the
            submission of personal information during the sign-up process.
          </p>
        </div>
      </section>
    </>
  );
}
Home.noAuth = true;
