import React from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton'
import {IoAddCircleOutline} from "react-icons/io5"
import NestedView from './NestedView'
import {MdNavigateNext} from "react-icons/md"
import { useDispatch } from 'react-redux'
import { setEditCourse, setStep } from '../../../../../slices/courseSlice'

const CourseBuilderForm = () => {

    const {
    register,
    handleSubmit,
    formState:{errors}
    } = useForm()
    const dispatch = useDispatch();

    const onSubmit = async() => {

    }

    const goBack = () => {
     dispatch(setStep(1));
     dispatch(setEditCourse(true))
    }
    
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconButton
            type="submit"
            active={true}
            text={"Create Section"}
          >
            <IoAddCircleOutline size={20}  />
          </IconButton>
          
        </div>
      </form>
      {/* {course.courseContent.length > 0 && (
        <NestedView  />
      )} */}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconButton text="Next" active={true} >
          <MdNavigateNext />
        </IconButton>
      </div>
    </div>
  )
}

export default CourseBuilderForm
