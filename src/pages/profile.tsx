import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Trade To Learn | Profile</title>
      </Head>
      <section className="flex justify-center items-center h-full">
        <article className="text-center p-4 rounded-lg border border-neutral-400 dark:bg-neutral-800 dark:border-0">
          <h1 className="text-2xl">Profile</h1>
          <button
            className="mt-2 py-2 px-4 rounded-lg bg-red-600 dark:bg-red-400"
            type="button"
          >
            Delete Account
          </button>
        </article>
      </section>
    </>
  );
}
