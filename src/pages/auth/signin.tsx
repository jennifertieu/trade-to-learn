import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section className="h-full flex justify-center items-center">
      <div className="p-4 h-2/4 w-3/4 lg:w-1/4 text-center rounded-lg border border-blue-600 dark:bg-blue-400 dark:border-0">
        <h1 className="p-4 text-2xl">Sign In</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="py-2 px-4 border rounded-lg"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/trade" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
