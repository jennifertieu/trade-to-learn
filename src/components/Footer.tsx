const Footer = () => {
  const year = new Date(Date.now()).getFullYear();
  return (
    <footer className="text-center p-4 mt-8 text-sm shrink-0">
      <div>
        {year} © &nbsp;
        <a
          href="https://jennifertieu.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jennifer Tieu
        </a>
      </div>
    </footer>
  );
};

export default Footer;
