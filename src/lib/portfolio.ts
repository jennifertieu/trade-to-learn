import {
  addUserPortfolio,
  getUserPortfolio,
  updateUserPortfolioCash,
} from "./database";

export async function fetchUserPortfolio(
  userId: string | string[] | undefined
) {
  try {
    // fetch user portfolio
    const userPortfolio = await getUserPortfolio(userId);
    // if it doesnt exist, add new user portfolio
    if (!userPortfolio) {
      await addUserPortfolio(userId, 10000, [], []);
      const newUser = await getUserPortfolio(userId);
      return newUser;
    }
    return userPortfolio;
  } catch (ex) {
    console.error("Error with fetching user portfolio data", ex);
    throw ex;
  }
}

export async function updateUserPortfolio(
  userId: string | string[] | undefined,
  cash: number
) {
  try {
    const userPortfolio = await updateUserPortfolioCash(userId, cash);
    return userPortfolio;
  } catch (ex) {
    console.error("Error with getting user portfolio", ex);
    throw ex;
  }
}
