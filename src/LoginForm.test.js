import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import LoginForm from "./LoginForm";
import { jest } from '@jest/globals';

describe("test LoginForm", () => {
    it("render input and button components", () => {
        const { getByTestId } = render(<LoginForm />)

        const email_input = getByTestId("email_input");
        expect(email_input).toBeTruthy();
        expect(email_input).toHaveAttribute('type', 'email');
        const password_input = getByTestId("password_input");
        expect(password_input).toBeTruthy();
        expect(password_input).toHaveAttribute('type', 'password');
        const button = getByTestId("button");
        expect(button).toBeTruthy();
    });

    it("pass valid email and password to test input fields", () => {
        const { getByTestId } = render(<LoginForm />)

        const email_input = getByTestId("email_input");
        userEvent.type(email_input, "test123@mail.com");
        expect(getByTestId("email_input")).toHaveValue("test123@mail.com");

        const password_input = getByTestId("password_input");
        userEvent.type(password_input, "123456");
        expect(getByTestId("password_input")).toHaveValue("123456");
    })

    it("button disabled when inputs not filled", () => {
        const { getByTestId } = render(<LoginForm />);
        const button = getByTestId("button");
        expect(button).toBeDisabled();
    })

    it("button enabled when inputs filled", () => {
        const { getByTestId } = render(<LoginForm />);
        const email_input = getByTestId("email_input");
        userEvent.type(email_input, "test123@mail.com");
        const password_input = getByTestId("password_input");
        userEvent.type(password_input, "password123");

        const button = getByTestId("button");
        expect(button).not.toBeDisabled();
    })

    it("login with wrong input, show error message", async () => {
        const { getByTestId } = render(<LoginForm />);

        await act(() => {
            const email_input = getByTestId("email_input");
            userEvent.type(email_input, "test123@mail.com");
            const password_input = getByTestId("password_input");
            userEvent.type(password_input, "wrongPassword");
        })

        const button = getByTestId("button");
        await act(async () => {
            userEvent.click(button);
        })

        // const error_msg = getByTestId("error_msg");
        // expect(error_msg).toBeTruthy();
        expect(queryByText("Invalid email or password")).toBeInTheDocument();
    })

    it("login with correct input, no error message, show alert", async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation();
        const { getByTestId } = render(<LoginForm />);
        await act(async () => {
            const email_input = getByTestId("email_input");
            userEvent.type(email_input, "test123@mail.com");
            const password_input = getByTestId("password_input");
            userEvent.type(password_input, "password123");
        })

        const button = getByTestId("button");
        await act(async () => {
            userEvent.click(button);
        })

        expect(alertMock).toHaveBeenCalledTimes(1);

        // const error_msg = getByTestId("error_msg");
        // expect(error_msg).not.toBeTruthy();
        expect(queryByText("Invalid email or password")).not.toBeInTheDocument();

    })
});