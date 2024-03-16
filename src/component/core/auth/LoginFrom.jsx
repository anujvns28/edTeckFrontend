import React, { useState } from 'react'
import { login } from '../../../service/operation/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginFrom = () => {
  const [formData, setFormData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Calling....")
    login(formData, navigate, dispatch);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className='w-full'>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          placeholder='Enter Email Address'
          className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
             shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
          name='email'
          onChange={handleChange}
          type='email'
        />
      </label>

      <label className='w-full'>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          placeholder='Enter Password'
          className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
             shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
          name='password'
          onChange={handleChange}
          type='password'
        />

        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginFrom
