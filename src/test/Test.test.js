import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";


jest.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(null);
jest.spyOn(window.localStorage.__proto__, "removeItem").mockReturnValue(null);

describe("Header component", () => {
  test("renders the Dashboard and Orders links", () => {
    render(<Header />);
    const dashboardLink = screen.getByText("Dashboard");
    const ordersLink = screen.getByText("Orders");
    expect(dashboardLink).toBeInTheDocument();
    expect(ordersLink).toBeInTheDocument();
  });

  test("opens and closes the menu on avatar click", () => {
    render(<Header />);
    const avatar = screen.getByRole("img");
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    fireEvent.click(avatar);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    fireEvent.click(avatar);
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  test("navigates to the Profile and Payment pages on menu item click", () => {
    render(<Header />);
    const avatar = screen.getByRole("img");
    fireEvent.click(avatar);

    const profileMenuItem = screen.getByText("Profile");
    const paymentMenuItem = screen.getByText("Payment");

    
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    fireEvent.click(profileMenuItem);
    expect(mockNavigate).toHaveBeenCalledWith("/profile");

    fireEvent.click(paymentMenuItem);
    expect(mockNavigate).toHaveBeenCalledWith("/payment");
  });

  
});
