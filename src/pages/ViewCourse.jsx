import React from 'react'
import { Outlet } from 'react-router-dom'
import VideoSectionSidebar from '../component/core/viewCourse/VideoSectionSidebar'


const ViewCourse = () => {
  return (
    <>
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <VideoSectionSidebar  />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-6">
          <Outlet />
        </div>
      </div>
    </div>
   
  </>
  )
}

export default ViewCourse
