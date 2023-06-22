import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  function toggleMenu() {
    return setIsOpen(!isOpen);
  }

  function closeMenu() {
    return setIsOpen(false);
  }

  return (
    <header className="p-4 shrink-0">
      <nav className="flex">
        <div
          className={`mr-auto text-lg font-bold uppercase ${raleway.className}`}
        >
          <Link href="/">Trade To Learn</Link>
        </div>
        <div className="md:hidden">
          <button type="button" className="w-5" onClick={toggleMenu}>
            <div className="h-0.5 p-px bg-black dark:bg-white"></div>
            <div className="h-0.5 p-px bg-black dark:bg-white my-1"></div>
            <div className="h-0.5 p-px bg-black dark:bg-white"></div>
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "" : "hidden"
          } flex flex-col justify-center items-center gap-6 z-10 absolute top-0 left-0 bg-neutral-900 w-screen h-2/4 md:static md:w-fit md:h-fit md:bg-inherit md:flex md:flex-row md:gap-4`}
        >
          {session ? (
            <>
              <li>
                <Link
                  href="/trade"
                  className="hover:underline-offset-4 hover:underline"
                  onClick={closeMenu}
                >
                  Trade
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="hover:underline-offset-4 hover:underline"
                  onClick={closeMenu}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:underline-offset-4 hover:underline"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
          <li>
            {session ? (
              <button
                className="hover:underline-offset-4 hover:underline"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="hover:underline-offset-4 hover:underline"
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
        <div
          className={`${
            isOpen ? "" : "hidden"
          } p-4 absolute z-20 top-0 right-0 md:hidden text-lg hover:text-blue-400`}
        >
          <button type="button" onClick={closeMenu}>
            X
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
