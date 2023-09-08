import React from "react";
import { render, screen } from "@testing-library/react";
import Payment from "../Containers/Payment";

describe("Payment component", () => {
  test("renders the Payment title", () => {
    render(<Payment />);
    const paymentTitle = screen.getByText("Payment");
    expect(paymentTitle).toBeInTheDocument();
  });

  test("renders Active Plan and Validity with correct values", () => {
    const activePlan = "Some Active Plan";
    const validity = "Some Validity";

    render(<Payment activePlan={activePlan} validity={validity} />);
    
    const activePlanLabel = screen.getByText("Active Plan");
    const activePlanValue = screen.getByText(activePlan);
    const validityLabel = screen.getByText("Validity");
    const validityValue = screen.getByText(validity);

    expect(activePlanLabel).toBeInTheDocument();
    expect(activePlanValue).toBeInTheDocument();
    expect(validityLabel).toBeInTheDocument();
    expect(validityValue).toBeInTheDocument();
  });

  test("renders Payment History title", () => {
    render(<Payment />);
    const paymentHistoryTitle = screen.getByText("Payment History");
    expect(paymentHistoryTitle).toBeInTheDocument();
  });
});
