import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Profile from "../profile";

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

describe("Profile Page", () => {
  it("render profile page", () => {
    render(<Profile />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("display delete account button", () => {
    render(<Profile />);

    const deleteButton = screen.getByRole("button", { name: "Delete Account" });
    expect(deleteButton).toBeInTheDocument();
  });

  it("confirmation dialog is hidden", () => {
    render(<Profile />);

    const dialogElement = screen.getByTestId("confirmation-dialog");
    expect(dialogElement).not.toBeVisible();
  });
});
