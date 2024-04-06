import React, { useEffect } from 'react'
import RenderStapes from '../addCourse/RenderStapes'
import {useDispatch,useSelector} from  "react-redux"
import {useParams} from "react-router-dom"
import { getFullDetailsOfCourse } from '../../../../service/operation/Course'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'


const EditCourse = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const handleCourse = async() => {
    const result = await getFullDetailsOfCourse(courseId, token)
      if (result.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
  }

  console.log(course,"printing couse details")

  useEffect(() => {
   handleCourse()
  }, [])

  return (
   <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderStapes />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}

export default EditCourse
