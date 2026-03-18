import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../common/ConfirmationModal';
import { logout } from '../../../service/operation/Auth';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const {user} = useSelector((state) => state.profile);
  const settingIcon = {
    name: "Settings",
    path: "/dashboard/settings",
    icon:"VscSettingsGear"
  }

  const [modalData,setModalData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  return (
    <div>
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
          <div className='flex flex-col'>
            {
                sidebarLinks.map((item,index) => {
                    if(user.accountType === item.type) {
                        return <SidebarLink data={item} key={index}/>
                    }
                } )
            }
          </div>
          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

          <div className='flex flex-col'>
             <SidebarLink data={settingIcon}/>

             <button
             onClick={() => setModalData({
              text1:"Are you sure?",
              text2:"You will be logged out of your account.",
              btn1 : 'Logout',
              btn2:"Cancel",
              handlear1:() => logout(dispatch,navigate),
              handlear2:() => setModalData(null)
             })}
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div 
            className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
          </div>
        </div>

        {modalData && <ConfirmationModal modalData={modalData}/>}
    </div>
  )
}

export default Sidebar
