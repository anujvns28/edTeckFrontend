import React from 'react'

const IconButton = ({text,active,handlear}) => {
  return (
    <button onClick={handlear}
      className={`flex items-center cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 
      ${
        !active ? "bg-richblack-200" : "bg-yellow-50"
      }`}
    >
       {text}
    </button>
  )
}

export default IconButton
