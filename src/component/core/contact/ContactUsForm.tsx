import React, { useState } from "react"
import CountryCode from "../../../data/countrycode.json"


const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData,setFormData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    phonenumber:"",
    message:"",
    countrycode:"+91"
  })
  const [errors,setError] = useState({
    firstname:"",
    lastname:"",
    email:"",
    phonenumber:"",
    message:"",
  })

  const handleSubmint = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors = {
      firstname: formData.firstname ? "" : "Please Enter First Name",
      lastname: formData.lastname ? "" : "Please Enter Last Name",
      email: formData.email ? "" : "Please Enter Email",
      phonenumber: formData.phonenumber ? "" : "Please Enter Phone Number",
      message: formData.message ? "" : "Please Enter Message",
    };

    setError(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) return;
    console.log(formData)
  }

 

  
  return (
    <form onSubmit={handleSubmint}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              setFormData((prev) => ({...prev,firstname:e.target.value}))
              setError((prev) => ({...prev,firstname:""}))
            }}
          />

          { errors.firstname &&
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.firstname}
            </span>
          }
          
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"

            placeholder="Enter last name"
            className="form-style"
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              setFormData((prev) => ({...prev,lastname:e.target.value}))
              setError((prev) => ({...prev,lastname:""}))
            }}
          />

          {errors.lastname &&
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.lastname}
            </span>
          }
          
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
            setFormData((prev) => ({...prev,email:e.target.value}))
            setError((prev) => ({...prev,email:""}))
          }}
        />

        {errors.email &&
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.email}
          </span>
        }
        
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              name="countrycode"
              id="countrycode"
              className="form-style"
              onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setFormData((prev) => ({...prev,countrycode:e.target.value}))}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
  
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                setFormData((prev) => ({...prev,phonenumber:e.target.value}))
                setError((prev) => ({...prev,phonenumber:''}))
              }}
            />

            {errors.phonenumber &&
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phonenumber}
            </span>
          }
            
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={7}
          placeholder="Enter your message here"
          className="form-style"
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
            setFormData((prev) => ({...prev,message:e.target.value}))
            setError((prev) => ({...prev,message:""}))
          }}
        />

        {errors.message &&
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.message}
            </span>
          }
        
      </div>

      <button
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm
