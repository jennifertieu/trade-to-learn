import type { NextApiRequest, NextApiResponse } from "next";
import { getAggregates } from "../../client/PolygonRestClient";
import { IAggs } from "@polygon.io/client-js";

// You can also pass options to each individual call, each key will override keys from the options also set globally

const controller = new AbortController();
const overrideFetchOptions = {
  method: "GET",
  // signal: controller.signal
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | IAggs>
) {
  try {
    const data = await getAggregates(
      "AAPL",
      1,
      "day",
      "2023-04-03",
      "2023-04-03",
      undefined,
      overrideFetchOptions
    );
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
}
