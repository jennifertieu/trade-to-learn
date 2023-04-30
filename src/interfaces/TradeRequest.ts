interface TradeRequest {
    ticker: string,
    name: string,
    date: string,
    price: number, 
    quantity: number,
    total: number,
    orderType: string,
    duration: string,
    action: string
}

export default TradeRequest;
