import { MutableRefObject, useRef, useState } from "react";

type InfoTipProps = {
  name: string;
};

export default function InfoTip({ name }: InfoTipProps) {
  const infoBoxRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [infoBoxLeft, setInfoBoxLeft] = useState("50%");

  function handleInfoBoxOverflow() {
    if (!infoBoxRef.current) {
      return;
    }

    if (window.innerWidth < 1024) {
      return setInfoBoxLeft("50%");
    }

    const boundingClient = infoBoxRef.current?.getBoundingClientRect();
    if (boundingClient.left < 0) {
      return setInfoBoxLeft(
        Math.abs(boundingClient.left - 16).toString() + "px"
      );
    }

    if (boundingClient.right > window.innerWidth) {
      return setInfoBoxLeft(
        -Math.abs(boundingClient.right - window.innerWidth + 16).toString() +
          "px"
      );
    }
  }

  const tipDictionary: {
    [key: string]: string;
  } = {
    ticker:
      "A stock symbol or ticker is a unique series of letters assigned to a security for trading purpose",
    "day change":
      "For a stock or bond quote, day change is the difference between the current price and the last trade of the previous day",
    "current price":
      "Current price is the most recent price at which a security was sold on an exchange",
    "purchase price":
      "The price an investor pays for an investment, and the price becomes the investor’s cost basis for calculating gain or loss when selling the investment. To determine the cost basis of the purchases, the investor needs to calculate the weighted average cost, which is the total dollar amount of the purchases divided by the number of shares purchased.",
    "order type":
      "A market order is the most basic type of trade. It is an order to buy or sell immediately at the current price.",
    action: "Buy/Sell allow you add/remove stocks from your portfolio.",
    "total change":
      "Subtract the total purchase price (purchase price x quantity) from total current price of the stock (current price x quantity) then divide that by the purchase price and multiply that figure by 100. This gives you the total percentage change",
    "total value":
      "The current market price of the shares multiplied by the number of shares held for that specific stock (Market Value)",
    cash: "Total amount of cash available for making trades.",
    quote: "A stock quote is the price of a stock as quoted on an exchange",
    holdings:
      "Holdings are the contents of an investment portfolio held by an individual or an entity",
  };
  const tipDescription = tipDictionary[name.toLowerCase()];
  return (
    <>
      {tipDescription ? (
        <button
          className="group inline-block relative border rounded-full h-4 w-4 text-center leading-3 text-sm text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 ms-1"
          onMouseOver={handleInfoBoxOverflow}
        >
          i
          <div
            className="group-hover:block hidden rounded w-72 p-4 md:p-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:absolute lg:top-0 lg:-translate-y-full text-black dark:text-white bg-blue-600 dark:bg-blue-400"
            ref={infoBoxRef}
            style={{ left: infoBoxLeft }}
          >
            <div className="font-bold text-center mb-2 block lg:hidden">
              {name}
            </div>
            <p className="mb-2 whitespace-normal leading-normal">
              {tipDescription}
            </p>
            <small className="block md:hidden mb-2">
              Definition sourced from{" "}
              <a
                className="underline"
                href="https://www.investopedia.com/"
                rel="noopener noreferrer"
              >
                Investopedia
              </a>
            </small>
            <small className="block md:hidden text-gray-300">
              Note: Click anywhere outside the window to close
            </small>
          </div>
        </button>
      ) : (
        ""
      )}
    </>
  );
}
