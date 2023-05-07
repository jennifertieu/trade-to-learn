export default function InfoTip() {
  // TODO: dynamically position tooltip over button
  // calculate mouse position and window position
  return (
    <>
      <button className="info-button text-indigo-700 dark:text-indigo-300 ms-1">
        i
        <div className="info-box">
          Both “stock market” and “stock exchange” are often used
          interchangeably. Traders in the stock market buy or sell shares on one
          or more of the stock exchanges that are part of the overall stock
          market.
        </div>
      </button>
    </>
  );
}
