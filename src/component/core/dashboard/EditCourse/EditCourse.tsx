import React, { useEffect } from 'react'
//@ts-ignore
import RenderStapes from '../addCourse/RenderStapes'
import {useDispatch,useSelector} from  "react-redux"
import {useParams} from "react-router-dom"
import { getFullDetailsOfCourse } from '../../../../service/operation/Course'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import { rootState } from '../../../../reducer'


const EditCourse = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state:rootState) => state.course)
  const { token } = useSelector((state:rootState) => state.auth)

  const handleCourse = async() => {
    if(courseId && token){
      const result = await getFullDetailsOfCourse(courseId, token)
      if (result && result.data) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result.data));
      }
    }
  }


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
