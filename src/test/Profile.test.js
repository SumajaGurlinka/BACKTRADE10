import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../Containers/Profile";

describe("Profile component", () => {
  test("renders the Profile title", () => {
    render(<Profile />);
    const profileTitle = screen.getByText("Profile");
    expect(profileTitle).toBeInTheDocument();
  });

  test("renders the user's full name", () => {
    
    const userDetails = {
      firstname: "John",
      lastname: "Doe",
    };
    jest.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(
      JSON.stringify(userDetails)
    );

    render(<Profile />);

    const fullName = screen.getByText("John Doe");
    expect(fullName).toBeInTheDocument();
  });

  test("renders user's email and phone", () => {
   
    const userDetails = {
      sub: "sumaja@gmailcom",
      phone: "1234567890",
    };
    jest.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(
      JSON.stringify(userDetails)
    );

    render(<Profile />);

    const emailLabel = screen.getByText("Email");
    const emailValue = screen.getByText("sumaja@example.com");
    const phoneLabel = screen.getByText("Phone");
    const phoneValue = screen.getByText("1234567890");

    expect(emailLabel).toBeInTheDocument();
    expect(emailValue).toBeInTheDocument();
    expect(phoneLabel).toBeInTheDocument();
    expect(phoneValue).toBeInTheDocument();
  });

 
});
