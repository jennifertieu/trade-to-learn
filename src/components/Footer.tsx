const Footer = () => {
  const year = new Date(Date.now()).getFullYear();
  return (
    <footer className="text-center p-4 text-sm">
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
