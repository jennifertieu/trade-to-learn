import PortfolioProps from "@/interfaces/PortfolioProps";

const PortfolioCard = ({ portfolio, updatePortfolio }: PortfolioProps) => {
  return (
    <article className="p-4 rounded-lg border border-neutral-400 dark:bg-neutral-800 dark:border-0">
      <h2 className="text-lg">Portfolio</h2>
      <div className="flex mt-2">
        <div>
          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            Cash
          </div>
          <div className="text-2xl font-semibold mt-1">
            {portfolio
              ? portfolio.cash.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : ""}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PortfolioCard;
