import { createContext, ReactNode } from "react";

export const UserContext = createContext(null);

export function UserContextProvider(props: ReactNode) {
  return <UserContext.Provider value={}>{props}</UserContext.Provider>;
}
