import Portfolio from "@/interfaces/Portfolio";
import PortfolioDocument from "@/interfaces/PortfolioDocument";
import TradeQuoteData from "@/interfaces/TradeQuoteData";
import TradeRequest from "@/interfaces/TradeRequest";

export function getQuoteDetails(
  ticker: string,
  tradeQuoteData: TradeQuoteData[]
) {
  for (const quoteData of tradeQuoteData) {
    if (quoteData.ticker === ticker) {
      return quoteData;
    }
  }
}

export function calculateUserTrade(
  portfolio: PortfolioDocument,
  name: string | undefined,
  ticker: string,
  quantity: number,
  price: number,
  action: string
) {
  for (const item of portfolio.stocks) {
    if (item.ticker === ticker) {
      if (action.toUpperCase() === "BUY")
        item.quantity = item.quantity + quantity;
      if (action.toUpperCase() === "SELL")
        item.quantity = item.quantity - quantity;

      // calculate the item's purchase price
      item.purchase_price = calculateAveragePrice(
        portfolio.transactions,
        ticker
      );

      return item;
    }
  }

  return {
    name: name ? name : "",
    ticker,
    purchase_price: price,
    quantity: quantity,
  };
}

export function calculateUserCash(
  portfolioCash: number,
  tradeTotal: number,
  action: string
) {
  return action.toUpperCase() === "BUY"
    ? portfolioCash - tradeTotal
    : portfolioCash + tradeTotal;
}

function calculateAveragePrice(
  portfolioTransactions: TradeRequest[],
  ticker: string
) {
  const filterPortfolio = portfolioTransactions.filter(
    (item) => item.ticker === ticker
  );

  if (filterPortfolio.length === 0) {
    return filterPortfolio[0].price;
  }

  const prices = filterPortfolio.map((item) => item.price);
  const sumPrices = prices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sumPrices / prices.length;
}
