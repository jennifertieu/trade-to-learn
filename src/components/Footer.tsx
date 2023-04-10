const Footer = () => {
  const year = new Date(Date.now()).getFullYear();
  return (
    <footer>
      <div>
        {year} ©
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
