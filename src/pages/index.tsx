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
      <section className="text-center pt-4 px-4 mt-4 flex flex-col lg:flex-row justify-center items-center gap-6 w-full h-full">
        <article className="px-2">
          <h1 className="climate-crisis-font text-4xl font-bold uppercase tracking-wide">
            Welcome <br />
            to <br />
            Trade To Learn
          </h1>
          <p className="p-4 text-lg my-4">
            A beginner friendly way to start trading, Trade to Learn is a simple
            and easy-to-use trading application that uses real-market data. It
            does NOT require any real money investment or the submission of
            personal information.
          </p>
          <Link
            className="rounded-lg bg-blue-500 py-4 px-8 text-lg text-white mt-4 uppercase"
            href={session ? "/trade" : "/auth/signin"}
          >
            Start Trading
          </Link>
        </article>
        <Image
          src="/img/hero-image.svg"
          alt="Trading Preview"
          width={900}
          height={500}
          className="rounded-lg w-full lg:max-w-screen-sm"
        />
      </section>
    </>
  );
}
Home.noAuth = true;
