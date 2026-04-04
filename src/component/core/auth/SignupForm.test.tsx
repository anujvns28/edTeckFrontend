import {render,screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import SignupForm from "./SignupForm";
import { sendOtp } from "../../../service/operation/Auth";
import toast from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";



jest.mock("../../../service/operation/Auth",()=>({
    sendOtp:jest.fn()
}))

const mockDispatch = jest.fn();
jest.mock("react-redux",()=>({
    useDispatch : () => mockDispatch
}))

const mockNavigate = jest.fn();
jest.mock("react-router-dom",()=>({
    useNavigate : () => mockNavigate
}))

jest.mock("react-hot-toast", () => ({
  error: jest.fn()
}));

jest.mock("../../../slices/authSlice", () => ({
  setSignupData: jest.fn()
}));

describe("signupForm",()=>{
    test("renders input aur buttons",()=>{
        render(<SignupForm/>)
        
        expect(screen.getByPlaceholderText("Enter first name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter last name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter email address")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByRole("button",{name:"Create Account"})).toBeInTheDocument();
    })

    test("user can type inputs", async()=>{
        render(<SignupForm/>);

        const firstName = screen.getByPlaceholderText("Enter first name");
        const lastName = screen.getByPlaceholderText("Enter last name");
        const email = screen.getByPlaceholderText("Enter email address");
        const password = screen.getByPlaceholderText("Enter Password");
        const cnfPass = screen.getByPlaceholderText("Confirm Password");

        await userEvent.type(firstName,"anuj");
        await userEvent.type(lastName,"yadav");
        await userEvent.type(email,"anujvns28@gmail.com");
        await userEvent.type(password,"1234");
        await userEvent.type(cnfPass,"1234");

        expect(firstName).toHaveValue("anuj");
        expect(lastName).toHaveValue("yadav");
        expect(email).toHaveValue("anujvns28@gmail.com");
        expect(password).toHaveValue("1234");
        expect(cnfPass).toHaveValue("1234")
    })

    test("call send otp function on submit",async()=>{
        render(<SignupForm/>)

         const firstName = screen.getByPlaceholderText("Enter first name");
        const lastName = screen.getByPlaceholderText("Enter last name");
        const email = screen.getByPlaceholderText("Enter email address");
        const password = screen.getByPlaceholderText("Enter Password");
        const cnfPass = screen.getByPlaceholderText("Confirm Password");
        const btn = screen.getByRole("button",{name:"Create Account"})

        await userEvent.type(firstName,"anuj");
        await userEvent.type(lastName,"yadav");
        await userEvent.type(email,"anujvns28@gmail.com");
        await userEvent.type(password,"1234");
        await userEvent.type(cnfPass,"1234");

        await userEvent.click(btn);

        expect(sendOtp).toHaveBeenCalledWith(
            "anujvns28@gmail.com",mockNavigate
        )
    })

    test("shows error when password does not match", async () => {
        render(<SignupForm />);

        const user = userEvent.setup();

        const firstName = screen.getByPlaceholderText("Enter first name");
        const lastName = screen.getByPlaceholderText("Enter last name");
        const email = screen.getByPlaceholderText("Enter email address");
        const password = screen.getByPlaceholderText("Enter Password");
        const cnfPass = screen.getByPlaceholderText("Confirm Password");
        const btn = screen.getByRole("button", { name: "Create Account" });

        await user.type(firstName, "anuj");
        await user.type(lastName, "yadav");
        await user.type(email, "test@example.com");

        //  mismatch password
        await user.type(password, "1234");
        await user.type(cnfPass, "1989");

        await user.click(btn);

        //  toast call hona chahiye
        expect(toast.error).toHaveBeenCalledWith("Password not matched");

        //  sendOtp call nahi hona chahiye
        expect(sendOtp).not.toHaveBeenCalled();
    });

    test("dispatch signup data on submit", async () => {
        render(<SignupForm />);

        const user = userEvent.setup();

        const firstName = screen.getByPlaceholderText("Enter first name");
        const lastName = screen.getByPlaceholderText("Enter last name");
        const email = screen.getByPlaceholderText("Enter email address");
        const password = screen.getByPlaceholderText("Enter Password");
        const cnfPass = screen.getByPlaceholderText("Confirm Password");
        const btn = screen.getByRole("button", { name: "Create Account" });

        await user.type(firstName, "anuj");
        await user.type(lastName, "yadav");
        await user.type(email, "test@example.com");
        await user.type(password, "1234");
        await user.type(cnfPass, "1234");

        await user.click(btn);

        // check action call
        expect(setSignupData).toHaveBeenCalledWith({
            firstName: "anuj",
            lastName: "yadav",
            email: "test@example.com",
            password: "1234",
            confirmPassword: "1234",
            accountType: "Student"
        });

        // check dispatch call
        expect(mockDispatch).toHaveBeenCalled();
});
})