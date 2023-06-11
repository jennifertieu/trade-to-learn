import TradeRequest from "./TradeRequest";
import Holding from "@/types/Holding";

interface Portfolio {
  cash: number;
  stocks: Holding[];
  transactions: TradeRequest[];
}

export default Portfolio;
