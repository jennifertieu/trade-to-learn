import {
  IAggs,
  IAggsQuery,
  IDailyOpenClose,
  IDailyOpenCloseQuery,
  restClient,
} from "@polygon.io/client-js";
import { IRequestOptions } from "@polygon.io/client-js/lib/rest/transport/request";

const globalFetchOptions = {
  method: "HEAD",
};

const rest = restClient(
  process.env.POLYGON_API_KEY,
  "https://api.polygon.io",
  globalFetchOptions
);

// The signal option configures a timeout of 8 seconds for this call.
// The method option overrides the one we set globally.
// const controller = new AbortController();
// const id = setTimeout(() => controller.abort(), 8000);

export async function getAggregates(
  ticker: string,
  multiplier: number,
  timespan: string,
  from: string,
  to: string,
  query?: IAggsQuery,
  options?: IRequestOptions
): Promise<void | IAggs> {
  return rest.stocks
    .aggregates(ticker, multiplier, timespan, from, to, query, options)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.error("An error happened:", e.message);
    });
}

export async function getDailyOpenClose(
  symbol: string,
  date: string,
  query?: IDailyOpenCloseQuery,
  options?: IRequestOptions
): Promise<void | IDailyOpenClose> {
  return rest.stocks
    .dailyOpenClose(symbol, date, query, options)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.error("An error occuered:", e.message);
    });
}
