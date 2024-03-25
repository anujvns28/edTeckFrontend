import React from 'react'
import * as Icons from  "react-icons/vsc"
import { NavLink } from 'react-router-dom'
import { useRouteMatch } from '../../../hooks/useRouteMatch'

const SidebarLink = ({data}) => {
  console.log(data)
    
    const Icon = Icons[data.icon]

  return (
    <NavLink
    to={data.path}
    className={`relative px-8 py-2 text-sm font-medium  transition-all duration-200
    ${
      useRouteMatch(data.path)
        ? "bg-yellow-800 text-yellow-50"
        : "bg-opacity-0 text-richblack-300"
    }`}
  >
    <span
      className={`absolute left-0 top-0 h-full w-[0.15rem] `}
    ></span>
    <div className="flex items-center gap-x-2">
      {/* Icon Goes Here */}
      <Icon className="text-lg" />
      <span>{data.name}</span>
    </div>
  </NavLink>  
  )
}

export default SidebarLink
