import React, { useEffect } from 'react'
import IconButton from '../../../../common/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editCourseDetails } from '../../../../../service/operation/Course';

const PublishCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course)
    const {register,handleSubmit,getValues,setValue} = useForm();

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const onSubmit = async(data) =>{
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public") ? "Published" : "Draft"
    formData.append("status", courseStatus)

    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
  }
   
  useEffect(() => {
    if (course?.status === "Published") {
      setValue("public", true)
    }
  }, [])

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)} >
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconButton active={true} text="Save Changes" type={"submit"} />
        </div>
      </form>
    </div>
  )
}

export default PublishCourse
