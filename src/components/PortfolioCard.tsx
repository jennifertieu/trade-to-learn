import Portfolio from "@/interfaces/Portfolio";

const PortfolioCard = ({ portfolio, updatePortfolio }: Portfolio) => {
  // TODO: useEffect, add event listener to calculate day change, total gains, etc
  return (
    <article className="p-4 rounded-lg border border-neutral-400 dark:bg-neutral-800 dark:border-0">
      <h2 className="text-lg">Portfolio</h2>
      <p className="text-2xl font-semibold mt-2">
        {portfolio
          ? portfolio.cash.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : ""}
      </p>
    </article>
  );
};

export default PortfolioCard;
