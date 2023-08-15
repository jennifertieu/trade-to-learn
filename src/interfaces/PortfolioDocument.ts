import TradeRequest from "@/interfaces/TradeRequest";
import Holding from "@/types/Holding";
import { ObjectId } from "mongodb";

interface PortfolioDocument {
  userId: string;
  cash: number;
  stocks: Holding[];
  transactions: TradeRequest[];
}

export default PortfolioDocument;
