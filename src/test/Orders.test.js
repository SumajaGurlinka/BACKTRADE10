import React from "react";
import { render, screen } from "@testing-library/react";
import Orders from "../Containers/Orders";

describe("Orders component", () => {
  test("renders table with order details", () => {
    
    const ordersData = [
      {
        time: "2023-08-01 10:00:00",
        type: "BUY",
        symbol: "AAPL",
        quantity: 100,
        avgPrice: 150,
        status: "Pending",
      },
    
    ];

    render(<Orders orders={{ ordersData }} />);

    
    const timeHeader = screen.getByText("Time");
    const typeHeader = screen.getByText("Type");
    const instrumentHeader = screen.getByText("Instrument");
    const qtyHeader = screen.getByText("Qty.");
    const avgPriceHeader = screen.getByText("Avg.Price");
    const statusHeader = screen.getByText("Status");
    expect(timeHeader).toBeInTheDocument();
    expect(typeHeader).toBeInTheDocument();
    expect(instrumentHeader).toBeInTheDocument();
    expect(qtyHeader).toBeInTheDocument();
    expect(avgPriceHeader).toBeInTheDocument();
    expect(statusHeader).toBeInTheDocument();

   
    const timeCell = screen.getByText("2023-08-01 10:00:00");
    const typeCell = screen.getByText("BUY");
    const instrumentCell = screen.getByText("AAPL");
    const qtyCell = screen.getByText("100");
    const avgPriceCell = screen.getByText("150");
    const statusCell = screen.getByText("Pending");
    expect(timeCell).toBeInTheDocument();
    expect(typeCell).toBeInTheDocument();
    expect(instrumentCell).toBeInTheDocument();
    expect(qtyCell).toBeInTheDocument();
    expect(avgPriceCell).toBeInTheDocument();
    expect(statusCell).toBeInTheDocument();
  });

  test("renders 'You have not placed any order yet.' when there are no orders", () => {
    
    const ordersData = [];

    render(<Orders orders={{ ordersData }} />);

    const noOrdersText = screen.getByText(
      "You have not placed any order yet."
    );
    expect(noOrdersText).toBeInTheDocument();
  });
});
