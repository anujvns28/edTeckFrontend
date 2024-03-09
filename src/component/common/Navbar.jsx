import React, { useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from 'react-redux'

const Navbar = () => {
    const location = useLocation();
    const {token} = useSelector((state) => state.auth);

     const checkLocation = (route) => {
     const result = matchPath({path:route},location.pathname);
     return result
     }

     console.log(token)

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
       
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

       {/* links */}
       <div className='flex gap-x-6 text-richblack-25'>
         {
            NavbarLinks.map((item) => (
               item.title !== "Catalog" ? 
               <Link to={item?.path}>
                <p className={`${checkLocation(item.path) ? "text-yellow-25" : ""}`}>{item.title}</p>
                </Link>
                 : <div></div>
            ))
           
         }
       </div>

       {/* login signup */}
       <div className='items-center gap-x-4 flex'>
       {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
       </div>

      </div>
    </div>
  )
}

export default Navbar
