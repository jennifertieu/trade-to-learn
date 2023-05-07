import Holdings from "../types/Holdings";
import TradeRequest from "./TradeRequest";

interface Portfolio {
  cash: number;
  stocks: Holdings[];
  transactions: TradeRequest[];
}

export default Portfolio;
