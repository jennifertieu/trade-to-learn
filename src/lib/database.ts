import mongoClientPromise from "./mongoDBClient";

export async function getUserPortfolio(userId: string | string[] | undefined) {
  try {
    const db = (await mongoClientPromise).db();
    const portfolio = db.collection("portfolio");
    const userPortfolio = await portfolio.findOne({ userId: userId });
    return userPortfolio;
  } catch (ex) {
    console.error("Error with getting user portfolio", ex);
    throw ex;
  }
}
