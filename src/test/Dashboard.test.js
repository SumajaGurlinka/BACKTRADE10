import React from "react";
import { getByText, queries, queryByText, render } from "@testing-library/react";
import Dashboard from "../Containers/Dashboard";

describe("Dashboard component", () => {
  test("renders greeting section with user's first name", () => {
    const firstName = "sumaja";

    const { getByText } = render(<Dashboard user={{ scroll: false }} />);
    const greetingText = getByText(`Hi, ${firstName}`);
    expect(greetingText).toBeInTheDocument();
  });

  test("renders margin section with correct values", () => {
    const { getByText } = render(<Dashboard user={{ scroll: false }} />);
    const marginUsedText = getByText("Margin Used");
    expect(marginUsedText).toBeInTheDocument();
    const marginUsedValue = getByText("59.76k");
    expect(marginUsedValue).toBeInTheDocument();

    const marginAvailableText = getByText("Margin Available");
    expect(marginAvailableText).toBeInTheDocument();
    const marginAvailableValue = getByText("2.25L");
    expect(marginAvailableValue).toBeInTheDocument();
  });

  test("renders session details section with correct values", () => {
    const activeSessionType = "SELECT_DATE"; 
    const date = "2023-08-01"; 
    const { getByText, queryByText } = render(
      <Dashboard user={{ scroll: false, activeSessionType, date }} />
    );

    const sessionTypeText = getByText("Session Type");
    expect(sessionTypeText).toBeInTheDocument();
    const activeSessionTypeValue = getByText(activeSessionType);
    expect(activeSessionTypeValue).toBeInTheDocument();
   

    if (activeSessionType === "SELECT_DATE") {
      const dateText = getByText("Date");
      expect(dateText).toBeInTheDocument();
      const selectedDateValue = getByText(date);
      expect(selectedDateValue).toBeInTheDocument();
    } else {
      const dateText = queryByText("Date");
      expect(dateText).toBeNull();
    }
   
    
    
  });
});
