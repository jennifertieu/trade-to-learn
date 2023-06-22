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
      <section className="text-center py-8 flex flex-col justify-center items-center gap-6 bg-blue-600">
        <h1 className="climate-crisis-font text-5xl font-bold uppercase text-black">
          Welcome
        </h1>
        <p className="text-black">A beginner friendly way to start trading</p>
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
      <section className="leading-normal flex flex-col items-center p-4 text-black mt-10">
        <h2 className="text-xl font-bold mt-3 text-white">About</h2>
        <div className="flex max-w-5xl flex-col justify-between md:flex-row">
          <p className="climate-crisis-font mt-3 text-2xl p-4">
            An easy way to get started trading without the risk of losing real
            money.
          </p>
          <div className="flex flex-col">
            <p className="p-4 text-xl">
              Trade to Learn is a beginner-friendly way to start trading stocks.
              It is a simple and easy-to-use trading application that uses
              real-market data to help educate you on trading.
            </p>
            <p className="p-4 text-xl">
              Our application does NOT require any real money investment or the
              submission of personal information during the sign-up process.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
Home.noAuth = true;
