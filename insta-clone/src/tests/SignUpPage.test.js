import SignUpPage from "../components/SignUpPage/SignUpPage";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe('functions of component', () => {
  it('Log in link', () => {
    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    const link = screen.getByRole("link");

    userEvent.click(link);

    expect(window.location.pathname).toBe('/login');
  });
});