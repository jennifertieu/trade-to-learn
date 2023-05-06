import { useContext } from "react";
import { transactions } from "@/data/transactionsExample";
import TradeRequest from "@/interfaces/TradeRequest";
import TradeQuoteData from "@/interfaces/TradeQuoteData";
import PortfolioProps from "@/types/PortfolioProps";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { getQuoteDetails } from "@/lib/validateTrade";
import { PortfolioContext } from "@/context/PortfolioContext";

interface TradeProps {
  tradeQuoteData: TradeQuoteData[];
}

type Inputs = {
  ticker: string;
  action: string;
  quantity: number;
  orderType: string;
  duration: string;
};

const Trade: React.FC<TradeProps> = ({ tradeQuoteData }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ticker: "",
      action: "",
      quantity: 0,
      orderType: "Market",
      duration: "Day",
    },
  });
  const quantityInput = watch("quantity");
  const tickerInput = watch("ticker");
  const tickerPrice = getQuoteDetails(tickerInput, tradeQuoteData)?.price;
  const { portfolio, updateCash, updateUserHoldings, getUserHoldings } =
    useContext(PortfolioContext);

  const notify = () => {
    toast.success("Trade successfully submitted");
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const tradeQuote = getQuoteDetails(data.ticker, tradeQuoteData);
    const name = tradeQuote?.name;
    const price = tradeQuote?.price ? tradeQuote.price : 0;
    const totalPrice = data.quantity * price;

    if (
      data.action.toUpperCase() === "SELL" &&
      !getUserHoldings(data.ticker, data.quantity)
    ) {
      setError("quantity", {
        type: "assets",
        message: "You do not have any or an insufficient amount to sell",
      });
      return false;
    }

    if (data.action.toUpperCase() === "BUY" && totalPrice > portfolio.cash) {
      setError("quantity", {
        type: "cash",
        message: "You do not have enough cash to buy",
      });
      return false;
    }

    transactions.push({
      ...data,
      name,
      total: totalPrice,
      date: new Date().toISOString(),
      price,
    } as TradeRequest);

    updateUserHoldings(data.ticker, data.quantity, data.action);

    updateCash(data.quantity * price, data.action);

    notify();

    reset();
  };

  return (
    <article className="rounded-lg p-6 w-full lg:w-4/12 border border-neutral-400 dark:bg-neutral-800 dark:border-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg">Trade</h2>
        <div className="mt-6">
          <label className="block" htmlFor="ticker">
            Symbol
          </label>
          <select
            className="rounded-lg w-full p-2"
            id="ticker"
            {...register("ticker", { required: "This field is required" })}
          >
            <option value="">Please select an asset</option>
            {tradeQuoteData.map((data, index) => (
              <option value={data.ticker} key={index}>
                {data.ticker} - {data.name}
              </option>
            ))}
          </select>
          <div className="mt-1 text-red-600 dark:text-red-400">
            {errors.ticker?.message}
          </div>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="action">
            Action
          </label>
          <select
            className="rounded-lg w-full p-2"
            id="action"
            {...register("action", { required: "This field is required" })}
          >
            <option value="">Please choose an action</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <div className="mt-1 text-red-600 dark:text-red-400">
            {errors.action?.message}
          </div>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="rounded-lg w-full p-2"
            id="quantity"
            type="number"
            min={0}
            {...register("quantity", {
              required: "This field is required",
              min: { value: 1, message: "Quantity must be greater than 0" },
            })}
          />
          {quantityInput > 0 && tickerPrice ? (
            <div className="mt-1 text-sm text-sky-700 dark:text-sky-300">
              Estimated total price:{" "}
              {(quantityInput * tickerPrice).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          ) : (
            ""
          )}
          <div className="mt-1 text-red-600 dark:text-red-400">
            {errors.quantity?.type === "required" && errors.quantity?.message}
          </div>
          <div className="mt-1 text-red-600 dark:text-red-400">
            {errors.quantity?.type === "min" && errors.quantity?.message}
          </div>
          <div className="mt-1 text-red-600 dark:text-red-400">
            {errors.quantity?.type === "assets" && errors.quantity?.message}
          </div>
          <div className="mt-1 text-red-600 dark:text-red-400">
            {errors.quantity?.type === "cash" && errors.quantity?.message}
          </div>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="orderType">
            Order Type
          </label>
          <select
            className="rounded-lg w-full p-2"
            id="orderType"
            {...register("orderType", { required: "This field is required" })}
          >
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
          </select>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="duration">
            Duration
          </label>
          <select
            className="rounded-lg w-full p-2"
            id="duration"
            {...register("duration", { required: "This field is required" })}
          >
            <option value="Day">Day</option>
            <option value="Until Cancelled">Until Cancelled</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 dark:bg-blue-400 text-neutral-50 py-2 px-4 mt-6 w-full"
        >
          Submit
        </button>
      </form>
    </article>
  );
};

export default Trade;
