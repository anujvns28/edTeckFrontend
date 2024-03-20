import React, { useEffect, useState } from "react"
import CountryCode from "../../../data/countrycode.json"
import { useForm } from "react-hook-form"


const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState:{ errors }

  } = useForm();
  
  
  const formSubmit = (e) => {
      e.preventDefault();
      console.log(e,"priigin e")
  }

  
  return (
    <form onSubmit={handleSubmit(formSubmit)}
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
            {...register("firstname",{required:true})}
          />
          { errors.firstname &&
           <span className="-mt-1 text-[12px] text-yellow-100">
           Please enter your name.
         </span>}
         
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
            {...register("lastname",{required:true})}
          />
          {
            errors.lastname &&
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your last name.
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
          {...register("email",{required:true})}
        />
        {
          errors.email && 
          <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your email.
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
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}
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
              {...register("phonenumber",{
                required:{
                  value:true,
                  message:"Pleace Enter your Phone number"
                },
                maxLength:{value:12,message:"Invalled Phone number"},
                minLength:{value:10,message:"Invalled Phone number"}
                })}
            />
            {
              errors.phonenumber && 
               <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.phonenumber.message}
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
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message",{required:true})}
        />
        {
          errors.message && 
          <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter message.
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
