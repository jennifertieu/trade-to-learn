import Portfolio from "../interfaces/Portfolio";

type PortfolioProps = {
  portfolio: Portfolio;
  updateCash: (tradeTotal: number, action: string) => void;
  updateUserHoldings: (
    ticker: string,
    quantity: number,
    action: string
  ) => void;
  getUserHoldings: (ticker: string, quantity: number) => boolean;
};

export default PortfolioProps;
