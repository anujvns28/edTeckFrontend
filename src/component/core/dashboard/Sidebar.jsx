import React from 'react'
import { useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
    const {user} = useSelector((state) => state.profile);

  return (
    <div>
        <div className='className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10"'>
          <div>
            {
                sidebarLinks.map((item) => {
                    if(user.accountType === item.type) {
                        return <SidebarLink data={item}/>
                    }
                } )
            }
          </div>
        </div>
    </div>
  )
}

export default Sidebar
