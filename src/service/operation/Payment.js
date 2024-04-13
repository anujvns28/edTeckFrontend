import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../api";
import rgpLogo from "../../assets/Logo/rzp_logo.png"

const {COURSE_PAYMENT_API,COURSE_VERIFY_API} = paymentEndpoints;

const loadScript = (src) => {
    return new Promise((resolve)=> {
        const script = document.createElement("script");
        script.src = src

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false);
        }
     document.body.appendChild(script);
    })
}

export const buyCourse = async(data,token,user_details) => {
    const {courses} = data
    const toastId = toast.loading("Loading...")
    try{
    
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
        toast.error(
          "Razorpay SDK failed to load. Check your Internet Connection."
        )
        return
    }

    const result = await apiConnector("POST",COURSE_PAYMENT_API,data,
    {Authorization: `Bearer ${token}`})

    console.log("PAYMENT RESPONSE FROM BACKEND............", result.data)
    console.log(process.env.REACT_APP_RAZORPAY_KEY,"this kfdjalj")
    
    var options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    currency: result.data.data.currency,
    amount: `${result.data.data.amount}`,
    order_id: result.data.data.id,
    name: "StudyNotion",
    description: "Thank you for Purchasing the Course.",
    image: rgpLogo,
    prefill: {
      name: `${user_details.firstName} ${user_details.lastName}`,
      email: user_details.email,
    }, 
        handler: function (response){
            verifyPayment({...response,courses},token)
        },
        
};

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response){
        alert(response.error.code);
});


    }catch(err){
        console.log(err,"error occer in buying course")
        toast.error("Could not make payment")
    }
    toast.dismiss(toastId)
}


// Verify the Payment
async function  verifyPayment(bodyData, token) {
    console.log(bodyData,"this is body data")
    const toastId = toast.loading("Verifying Payment...")
    
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
}

