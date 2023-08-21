import {
  addUserPortfolio,
  getUserPortfolio,
  updateUserPortfolioCash,
  deleteUserPortfolio,
  upsertUserStock,
  deleteUserStock,
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

export async function deleteUserPorfolio(
  userId: string | string[] | undefined
) {
  try {
    const response = await deleteUserPortfolio(userId);
    return response;
  } catch (ex) {
    console.error("Error with deleting user portoflio", ex);
    throw ex;
  }
}
