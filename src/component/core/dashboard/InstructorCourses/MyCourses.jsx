import React from 'react'
import CoursesTable from './CoursesTable'
import IconButton from '../../../common/IconButton'
import { useNavigate } from 'react-router-dom'
import {VscAdd} from "react-icons/vsc"

const MyCourses = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconButton
          active={true}
          text="Add Course"
          handlear={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconButton>
      </div>
      {/* {courses && <CoursesTable courses={courses} setCourses={setCourses} />} */}
    </div>
  )
}

export default MyCourses
