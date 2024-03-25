import React, { useRef, useState } from 'react'
import {AiOutlineCaretDown} from "react-icons/ai"
import {VscSignOut} from "react-icons/vsc"
import {VscDashboard} from "react-icons/vsc"  
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../service/operation/Auth'

const ProfileDropdown = () => {
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openRef = useRef();

    const [open,setOpen] = useState(false);

    window.addEventListener("click",(e) => {
        if(openRef.current !== e.target ){
            setOpen(false)
        }else{
            return
        }
    })

  return (
    <button className='relative' onClick={() => setOpen(true)}>
         <div ref={openRef} className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover pointer-events-none"
        />
        <AiOutlineCaretDown className="text-sm pointer-events-none text-richblack-100" />
      </div>
       
       {
        open && 
        <div 
        className='absolute text-white top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'>
          <Link to="/dashboard/my-profile">
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() =>logout(dispatch,navigate)}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
       }
      
    </button>
  )
}

export default ProfileDropdown
