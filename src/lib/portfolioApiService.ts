import type { Session } from "next-auth";

export const deleteUserPortfolio = async (session: Session | null) => {
  try {
    const response = await fetch(`/api/portfolio/${session?.user.id}`, {
      method: "DELETE",
      headers: {
        "Context-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
      }),
    });
    return response.json();
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
