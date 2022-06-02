import { __esModule } from "@testing-library/jest-dom/dist/matchers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "test" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorMsg = screen.getByTestId("error");
  expect(errorMsg).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled when inputs exist", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";
  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).not.toBeDisabled();
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const userItem = await screen.findByText("test");

  expect(userItem).toBeInTheDocument();
});
