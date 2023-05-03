import Holdings from "../types/Holdings";

interface Portfolio {
  cash: number;
  stocks: Holdings[];
}

export default Portfolio;
