import React, { ReactNode } from 'react'

type IconButtonProps = {
  text:string,
  active:boolean,
  children?:ReactNode,
  type?: "button" | "submit" | "reset",
  customClasses?:string
  handler?: () => void;
}

const IconButton = ({text,active,handler,children,type,customClasses}:IconButtonProps) => {
  return (
    <button onClick={handler} type={type}
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
