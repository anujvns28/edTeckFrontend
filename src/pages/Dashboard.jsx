import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/core/dashboard/Sidebar'


const Dashboard = () => {
  return (
    <div className='flex'>
        <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Dashboard
