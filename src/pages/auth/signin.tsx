import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section className="h-full flex justify-center items-center">
      <div className="p-4 w-3/4 lg:w-1/4 text-center rounded-lg border border-blue-600 dark:bg-blue-400 dark:border-0">
        <h1 className="p-4 text-2xl">Sign In</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex flex-col mt-2">
            {provider.name === "Email" ? (
              <form
                className="flex flex-col gap-4"
                method="post"
                action="/api/auth/signin/email"
              >
                <label className="block" htmlFor="email">
                  Email address
                </label>
                <input
                  className="rounded-lg p-2"
                  type="email"
                  id="email"
                  name="email"
                />
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <button
                  className="mt-2 py-2 px-4 border rounded-lg hover:bg-blue-600 hover:border-blue-600"
                  type="submit"
                >
                  Sign in with Email
                </button>
                <hr className="mt-2" />
              </form>
            ) : (
              <button
                className="mt-2 py-2 px-4 border rounded-lg hover:bg-blue-600 hover:border-blue-600"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            )}
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
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers: providers ?? [], csrfToken },
  };
}

SignIn.noAuth = true;
