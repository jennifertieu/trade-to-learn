import StockQuote from "./StockQuote";

interface StockDataQuote {
  meta?: {
    requested: number;
    returned: number;
  };
  data?: StockQuote[];
  error?: {
    code: string;
    message: string;
  };
}

export default StockDataQuote;
