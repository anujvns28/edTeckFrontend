import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CtaButtonType = {
  children:ReactNode,
  active:boolean,
  location:string
}

const CTAButton = ({children,active,location}:CtaButtonType) => {
  return (
   <Link to={location}>
    <div className={`px-5 py-3 text-center font-semibold rounded-md hover:scale-95 transition-all duration-200
   shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
    ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}`}>
      {children}
    </div>
   </Link>
  )
}

export default CTAButton
