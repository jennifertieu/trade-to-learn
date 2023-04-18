import Link from "next/link";

const Navbar = () => {
  return (
    <header className="p-4 border-b border-neutral-600 dark:border-neutral-400 shrink-0">
      <nav className="flex">
        <div className="mr-auto text-lg">Trade To Learn</div>
        <ul className="flex gap-4">
          <li>Crypto</li>
          <li>Portfolio</li>
          <li>Log In</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
