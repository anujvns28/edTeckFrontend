import React from 'react'

const LoginFrom = () => {
  return (
    <form 
    className="mt-6 flex w-full flex-col gap-y-4"
    >
        <label className='w-full'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
            placeholder='Enter Email Address'
            className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
             shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
            />
        </label>

        <label className='w-full'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
            </p>
            <input
            placeholder='Enter Password'
            className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0]
             shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
            />
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
