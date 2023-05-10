import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="p-4 shrink-0">
      <nav className="flex">
        <div
          className={`mr-auto text-lg font-bold uppercase ${raleway.className}`}
        >
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
