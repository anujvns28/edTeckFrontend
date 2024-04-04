import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton'
import {IoAddCircleOutline} from "react-icons/io5"
import NestedView from './NestedView'
import {MdNavigateNext} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { createSection, updateSection } from '../../../../../service/operation/Course'
import toast from 'react-hot-toast'

const CourseBuilderForm = () => {

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth)
  const [editSection,setEditSection] = useState(false);
  const [editSectionId,setEditSectionId] = useState();

    const {
    register,
    handleSubmit,
    formState:{errors},
    setValue,
    } = useForm()
    const dispatch = useDispatch();

    const onSubmit = async(data) => {
    if(editSection){
      const result = await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionId,
        courseId:course._id
      },
      token
      )

      if(result){
        dispatch(setCourse(result))
        setEditSection(false)
        setValue("sectionName","")
        setEditSectionId(null)
      }
      return
    }

    const result = await createSection(
      {
        sectionName:data.sectionName,
        courseId:course._id
      },
      token
      );
  
      if(result){
        dispatch(setCourse(result))
        setValue("sectionName","")
      }
    }

    const goBack = () => {
     dispatch(setStep(1));
     dispatch(setEditCourse(true))
    }

    const editSectionInformation = (sectionName,sectionId) =>{
        setEditSection(true)
        setValue("sectionName",sectionName)
        setEditSectionId(sectionId)
    }


    const goToNext = () => {
      if(course.courseContent.length === 0){
        toast.error("Add atlest one Section")
        return
      }

      if(course.courseContent.some((section) => section.subSection.length === 0)){
        toast.error("add atleast one lecture in each section")
        return
      }

      dispatch(setStep(3))
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
            text={editSection ? "Edit Section Name" : "Create Section"}
          >
            <IoAddCircleOutline size={20}  />
          </IconButton>

          {editSection && (
            <button
              type="button"
              onClick={() => {
                setEditSection(false)
                setValue("sectionName","")
              }}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
          
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView editSectionInformation={editSectionInformation} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>

        <IconButton text="Next" active={true} handlear={goToNext}>
          <MdNavigateNext />
        </IconButton>
      </div>
    </div>
  )
}

export default CourseBuilderForm
