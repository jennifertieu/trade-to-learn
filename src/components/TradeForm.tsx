import { useContext, useState } from "react";
import TradeRequest from "@/interfaces/TradeRequest";
import TradeQuoteData from "@/interfaces/TradeQuoteData";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import {
  calculateUserTrade,
  getQuoteDetails,
  calculateUserCash,
} from "@/lib/tradeHelpers";
import { PortfolioContext } from "@/context/PortfolioContext";
import { addUserTransactions } from "@/lib/portfolioTransactionsApiService";
import { useSession } from "next-auth/react";
import {
  deleteUserStock,
  upsertUserStock,
} from "@/lib/portfolioStocksApiService";
import { updateUserPortfolio } from "@/lib/portfolioApiService";
import InfoTip from "./InfoTip";

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

const TradeForm: React.FC<TradeProps> = ({ tradeQuoteData }) => {
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
  const {
    portfolio,
    updateCash,
    updateUserHoldings,
    addTransaction,
    hasSufficientStockForSale,
  } = useContext(PortfolioContext);
  const { data: session } = useSession();
  const [isExecuting, setIsExecuting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { ticker, action } = data;
      const quantity = +data.quantity;
      const tradeQuote = getQuoteDetails(ticker, tradeQuoteData);
      const name = tradeQuote?.name;
      const price = tradeQuote?.price ? tradeQuote.price : 0;
      const totalPrice = quantity * price;

      if (
        action.toUpperCase() === "SELL" &&
        !hasSufficientStockForSale(ticker, quantity)
      ) {
        setError("quantity", {
          type: "assets",
          message: "You do not have any or an insufficient amount to sell",
        });
        return false;
      }

      if (action.toUpperCase() === "BUY" && totalPrice > portfolio.cash) {
        setError("quantity", {
          type: "cash",
          message: "You do not have enough cash to buy",
        });
        return false;
      }

      setIsExecuting(true);

      const transactionResponse = await addUserTransactions(session, {
        ...data,
        name,
        total: totalPrice,
        date: new Date().toISOString(),
        price,
      } as TradeRequest);
      addTransaction(transactionResponse);

      const trade = calculateUserTrade(
        portfolio,
        name,
        ticker,
        quantity,
        price,
        action
      );

      if (trade?.quantity === 0) {
        const deleteResponse = await deleteUserStock(session, ticker);
        updateUserHoldings(deleteResponse);
      } else {
        const updatedResponse = await upsertUserStock(session, trade);
        updateUserHoldings(updatedResponse);
      }

      const cashCalculated = calculateUserCash(
        portfolio.cash,
        quantity * price,
        action
      );
      const portfolioResponse = await updateUserPortfolio(
        session,
        cashCalculated
      );
      updateCash(portfolioResponse.value.cash);

      setIsExecuting(false);

      toast.success("Trade successfully submitted");

      reset();
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong.");
    }
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
            data-testid="symbol select"
            {...register("ticker", { required: "This field is required" })}
          >
            <option value="">Please select an asset</option>
            {tradeQuoteData.map((data, index) => (
              <option value={data.ticker} key={index}>
                {data.ticker} - {data.name}
              </option>
            ))}
          </select>
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.ticker?.message}
          </div>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="action">
            Action
            <InfoTip name="Action" />
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
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">
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
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.quantity?.type === "required" && errors.quantity?.message}
          </div>
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.quantity?.type === "min" && errors.quantity?.message}
          </div>
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.quantity?.type === "assets" && errors.quantity?.message}
          </div>
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.quantity?.type === "cash" && errors.quantity?.message}
          </div>
        </div>
        <div className="mt-6">
          <label className="block" htmlFor="orderType">
            Order Type
            <InfoTip name="Order Type" />
          </label>
          <input
            className="rounded-lg w-full p-2 text-neutral-500 dark:bg-neutral-800 border border-neutral-500"
            id="orderType"
            type="text"
            {...register("orderType", { required: "This field is required" })}
            readOnly
          />
        </div>
        <button
          type="submit"
          className={`${
            isExecuting ? "opacity-50" : "opacity-100"
          } rounded-lg bg-blue-600 dark:bg-blue-400 text-neutral-50 py-2 px-4 mt-6 w-full relative`}
          disabled={isExecuting ? true : false}
        >
          {isExecuting && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Submit
        </button>
      </form>
    </article>
  );
};

export default TradeForm;
