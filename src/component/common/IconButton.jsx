import React from 'react'

const IconButton = ({text,active,handlear,children,type,customClasses}) => {
  return (
    <button onClick={handlear} type={type}
      className={`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 
      ${customClasses}
      ${
        !active ? "bg-richblack-200" : "bg-yellow-50"
      }`}
    >
       {text} {children}
    </button>
  )
}

export default IconButton
