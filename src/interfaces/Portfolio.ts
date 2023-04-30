interface Portfolio {
  cash: number;
  stocks: {
    name: string;
    ticker: string;
    current_price: number;
    purchase_price: number;
    quantity: number;
    total: number;
  }[];
}

export default Portfolio;
