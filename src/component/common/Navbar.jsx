import React, { useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { BsChevronDown } from "react-icons/bs"
import ProfileDropdown from '../core/auth/ProfileDropdown'

const Navbar = () => {

  const subLinks = [
    {
      title: "Python",
      link: "/catalog/python",
    },
    {
      title: "javascript",
      link: "/catalog/javascript",
    },
    {
      title: "web-development",
      link: "/catalog/web development",
    },
    {
      title: "Android Development",
      link: "/catalog/Android Development",
    },
  ];

  

  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  const checkLocation = (route) => {
    const result = matchPath({ path: route }, location.pathname);
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
        <div className='flex gap-x-6 text-richblack-25 relative'>
          {
            NavbarLinks.map((item) => (
              item.title !== "Catalog" ?
                <Link to={item?.path}>
                  <p className={`${checkLocation(item.path) ? "text-yellow-25" : ""}`}>{item.title}</p>
                </Link>
                : <div>

                  <div className={`group relative flex cursor-pointer items-center gap-1 ${checkLocation("/catalog/:catalogName")
                      ? "text-yellow-25"
                      : "text-richblack-25"
                    }`}>
                    <p>{item.title}</p>
                    <BsChevronDown />

                    {/* <div className="absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-45%] translate-y-[1.5em] flex-col opacity-0 rounded-lg bg-richblack-5 p-4 text-richblack-900  transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 z-10 h-6 w-6 translate-[80-x%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {
                      !subLinks ? 
                      <div className='flex items-center justify-center text-black'>Loading...</div> 
                      : <div>
                        {
                          subLinks.map((categories) => {
                            return <div className="">
                              <Link to={categories.link.split(" ").join("-").toLowerCase()}>
                                <div className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>
                                {categories.title}
                                </div>
                              </Link>
                            </div>
                          })
                        }
                      </div>
                      }
                    </div> */}
                  </div>
                </div>
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

          {token && <ProfileDropdown/>}
        </div>

      </div>
    </div>
  )
}

export default Navbar
