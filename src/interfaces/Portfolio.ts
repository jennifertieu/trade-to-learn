interface Portfolio {
  portfolio: {
    cash: number;
    stocks: [{
      name: string,
      ticker: string,
      current_price: number,
      purchase_price: number, 
      quantity: number,
      total: number
    }]
  };
  updatePortfolio: (tradeTotal: number, action: string) => void;
}

export default Portfolio;
