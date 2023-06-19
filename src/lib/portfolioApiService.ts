import type { Session } from "next-auth";

export const getUserPortfolio = async (session: Session) => {
  try {
    const response = await fetch(`/api/portfolio/${session.user.id}`);
    const userPortfolio = response.json();
    return userPortfolio;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const addUserPortfolio = async (session: Session) => {
  try {
    const response = await fetch(`/api/portfolio/${session.user.id}`, {
      method: "POST",
      headers: {
        "Context-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        cash: 10000,
        stocks: [],
        transactions: [],
      }),
    });
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const updateUserPortfolio = async (session: Session, cash: number) => {
  try {
    const response = await fetch(`/api/portfolio/${session.user.id}`, {
      method: "PUT",
      headers: {
        "Context-Type": "application/json",
      },
      body: JSON.stringify({
        filter: { userId: session?.user.id },
        update: { $set: { cash: cash } },
        options: { returnDocument: "after" },
      }),
    });
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const deleteUserPortfolio = async (session: Session) => {
  // TODO
};
