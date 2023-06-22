import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TradeForm from "../TradeForm";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: "Jennifer Tieu",
      email: "test@email.com",
      image: "",
      id: "ABC123",
    },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const mockExecuteTrade = jest.fn(() => Promise.resolve());
const mockTradeQuoteData = [
  {
    name: "Apple Inc.",
    ticker: "AAPL",
    price: 100.0,
  },
  {
    name: "Amazon.com, Inc.",
    ticker: "AMZN",
    price: 100.0,
  },
];

describe("TradeForm", () => {
  it("renders TradeForm", () => {
    render(<TradeForm tradeQuoteData={mockTradeQuoteData} />);
    const dropdownElement = screen.getByRole("option", {
      name: `${mockTradeQuoteData[0].ticker} - ${mockTradeQuoteData[0].name}`,
    });
    expect(dropdownElement).toBeInTheDocument();
  });

  it("select a symbol", () => {
    render(<TradeForm tradeQuoteData={mockTradeQuoteData} />);
    // symbol input
    const symbolDropdown = screen.getByTestId("symbol select");

    // Select the option
    fireEvent.change(symbolDropdown, { target: { value: "AAPL" } });

    // Assert that the selected value is 'AAPL'
    expect(symbolDropdown.value).toBe("AAPL");
  });

  it("Executes Trade", async () => {
    render(<TradeForm tradeQuoteData={mockTradeQuoteData} />);
    // symbol input
    // action input
    // quantity input
    // order type input
    // submit trade (button)
    // display progress
    // disable trade button
    // execute trade
    // hide progress
    // update state
  });
});
