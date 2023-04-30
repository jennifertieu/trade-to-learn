import Portfolio from "./Portfolio";

interface PortfolioProps {
  portfolio: Portfolio;
  updatePortfolio: (tradeTotal: number, action: string) => void;
}

export default PortfolioProps;
