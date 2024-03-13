import React, { useEffect, useState } from 'react'
import Tab from './Tab';

const SignupForm = () => {
  const [tab,setTab] = useState("Student");
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    accountType:tab
  });

  

  const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name] : e.target.value
  }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)
  }

  useEffect(() => {
   setFormData((prev) => ({
    ...prev,
    accountType:tab
   }))
  },[tab])

  return (
   <div className='w-full h-full'>
    <Tab tab={tab} setTab={setTab}/>
     <form  onSubmit={handleSubmit}
    className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              name='firstName'
              type='string'
              onChange={handleChange}
              placeholder="Enter first name"
              className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
              shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
            />
          </label>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              name='lastName'
              type='string'
              onChange={handleChange}
              placeholder="Enter last name"
              className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
              shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
            />
          </label>

        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            name='email'
            type='email'
            onChange={handleChange}
            placeholder="Enter email address"
            className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
             shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
          />
        </label>

        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              name='password'
              type='password'
              onChange={handleChange}
              placeholder="Enter Password"
              className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
              shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
            />
          </label>

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              name='confirmPassword'
              required
              type='password'
              onChange={handleChange}
              placeholder="Confirm Password"
              className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
             shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
            />
          </label>

        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
   </div>
  )
}

export default SignupForm
