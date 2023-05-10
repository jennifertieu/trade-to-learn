import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="p-4 border-b border-neutral-600 dark:border-neutral-400 shrink-0">
      <nav className="flex">
        <div className="mr-auto text-lg">
          <Link href="/">Trade To Learn</Link>
        </div>
        <ul className="flex gap-4">
          {session ? (
            <>
              <li>
                <Link href="/trade">Trade</Link>
              </li>
              <li>
                <Link href="/portfolio">Portfolio</Link>
              </li>
            </>
          ) : (
            ""
          )}
          <li>
            {session ? (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
