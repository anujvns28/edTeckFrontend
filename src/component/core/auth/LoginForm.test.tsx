import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";
import { login } from "../../../service/operation/Auth";


// // mock login function
jest.mock("../../../service/operation/Auth",()=>({
    login : jest.fn()
}))

// // mock react-router
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// // mock redux
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("LoginForm", () => {

  test("renders inputs and button", () => {
    render(
        <BrowserRouter>
            <LoginForm/>
        </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Enter Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  test("user can type in inputs", async() => {
    render(
        <BrowserRouter>
            <LoginForm/>
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter Email Address");
    const passwordInput = screen.getByPlaceholderText("Enter Password");

    await userEvent.type(emailInput,"test@gmail.com");
    await userEvent.type(passwordInput,"123456");
    

    expect(emailInput).toHaveValue("test@gmail.com");
    expect(passwordInput).toHaveValue("123456");
  });

  test("calls login function on submit", async() => {
    render(
        <BrowserRouter>
            <LoginForm/>
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter Email Address");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const button = screen.getByText("Sign In");

    await userEvent.type(emailInput,"test@gmail.com");
    await userEvent.type(passwordInput,"123456");

    await userEvent.click(button);

    expect(login).toHaveBeenCalledWith(
      {
        email: "test@gmail.com",
        password: "123456",
      },
      mockNavigate,
      mockDispatch
    );
  });

  test("can empty states works",async()=>{
    render(
        <BrowserRouter>
            <LoginForm/>
        </BrowserRouter>
    )

    const button = screen.getByText("Sign In");
    await userEvent.click(button);
    expect(login).not.toHaveBeenCalled()
  })

  test("should navigate on successful login", async () => {
    (login as jest.Mock).mockImplementation((data,naviage)=>{
        naviage("/dashboard")
    })

    render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("Enter Email Address");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const button = screen.getByText("Sign In");

    await userEvent.type(emailInput, "test@gmail.com");
    await userEvent.type(passwordInput, "123456");
    await userEvent.click(button);

    expect(login).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("should NOT navigate on login failure", async () => {
  (login as jest.Mock).mockRejectedValue(new Error("Login failed"));

  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText("Enter Email Address");
  const passwordInput = screen.getByPlaceholderText("Enter Password");
  const button = screen.getByText("Sign In");

  await userEvent.type(emailInput, "test@gmail.com");
  await userEvent.type(passwordInput, "123456");

  await userEvent.click(button);

  expect(login).toHaveBeenCalled();

  expect(mockNavigate).not.toHaveBeenCalled();
});

});