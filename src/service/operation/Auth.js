
import {apiConnector} from "../apiConnector"
import { useDispatch } from "react-redux";
import { setToken } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { setProfile } from "../../slices/profileSlice";

const {authEndPoinds} = require("../api");
const setLoading = false



const {
    LOGIN_API,
    SENDOTP_API,
    SIGNUP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = authEndPoinds


export async function sendOtp(email, navigate) {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      toast.dismiss(toastId)
    }
  
  
  export async function signUp(data,navigate,dispatch) {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("POST", SIGNUP_API, data)
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      toast.dismiss(toastId)
    }
  
  

  export async function login(data, navigate,dispatch) {
      const toastId = toast.loading("Loading...")
      let response
      try {
         response = await apiConnector("POST", LOGIN_API, data)

        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Login Successfull")
        navigate("/");

        dispatch(setToken(response.data.token))
        dispatch(setProfile(response.data.user))
        localStorage.setItem("token",JSON.stringify(response.data.token))

      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      
      toast.dismiss(toastId)
    }


    export async function getPasswordResetToken(email, setEmailSent) {
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnector("POST", RESETPASSTOKEN_API, {
            email,
          })
    
          console.log("RESETPASSTOKEN RESPONSE............", response)
    
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
    
          toast.success("Reset Email Sent")
          setEmailSent(true)
        } catch (error) {
          console.log("RESETPASSTOKEN ERROR............", error)
          toast.error("Failed To Send Reset Email")
        }
        toast.dismiss(toastId)
      }
    
    
    export async function resetPassword(data, navigate) {
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnector("POST", RESETPASSWORD_API,data)
    
          console.log("RESETPASSWORD RESPONSE............", response)
    
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
    
          toast.success("Password Reset Successfully")
          navigate("/login")
        } catch (error) {
          console.log("RESETPASSWORD ERROR............", error)
          toast.error("Failed To Reset Password")
        }
        toast.dismiss(toastId)
      }
    
  