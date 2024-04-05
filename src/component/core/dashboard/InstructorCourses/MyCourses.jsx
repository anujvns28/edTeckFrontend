import React, { useEffect, useState } from 'react'
import CoursesTable from './CoursesTable'
import IconButton from '../../../common/IconButton'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {VscAdd} from "react-icons/vsc"
import {useSelector} from "react-redux"
import { fetchInstructorCourses } from '../../../../service/operation/Course'

const MyCourses = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const {token} = useSelector((state) => state.auth);
  const [courses,setCourses] = useState([])

  const fetchCourses = async() => {
  const result = await fetchInstructorCourses(token)
  if(result){
    setCourses(result)

  }
  }

  useEffect(() =>{
    fetchCourses()
  },[])

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
      {courses && <CoursesTable courses={courses} fetchCourses={fetchCourses} />}
    </div>
  )
}

export default MyCourses
