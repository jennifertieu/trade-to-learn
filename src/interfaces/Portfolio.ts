import TradeRequest from "./TradeRequest";

type Holdings = {
  name: string;
  ticker: string;
  purchase_price: number;
  quantity: number;
};

interface Portfolio {
  cash: number;
  stocks: Holdings[];
  transactions: TradeRequest[];
}

export default Portfolio;
