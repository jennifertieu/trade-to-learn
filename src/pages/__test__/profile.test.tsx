import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Profile from "../profile";

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
});
