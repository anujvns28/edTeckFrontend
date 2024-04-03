import React, { useEffect } from 'react'
import {RxCross2} from "react-icons/rx"
import { useForm } from 'react-hook-form'
import SubSectionLecutureUploader from './SubSectionLecutureUploader'
import IconButton from '../../../../common/IconButton'
import { createSubSection, editCourseDetails } from '../../../../../service/operation/Course'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'

const SubSectionModal = ({subSectionModalData,setSubSectionModal}) => {
   
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue
    } = useForm()
    const dispatch = useDispatch()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    const handleForm = async(data) => {
        const formData = new FormData();

        formData.append("sectionId",subSectionModalData.sectionId)
        formData.append("title",data.lectureTitle)
        formData.append("video",data.lectureVidio)
        formData.append("description",data.lectureDesc)
        const result = await createSubSection(formData,token)

        if(result){
            const updateSection = course.courseContent.map((section) => 
                section._id == subSectionModalData.sectionId ? result : section
            )
            console.log(updateSection,"update secion")
            
            const updateCourse = {...course,courseContent:updateSection}
            dispatch(setCourse(updateCourse))
            setSubSectionModal(null)
        }
    }

    useEffect(() => {
     if( subSectionModalData.view){
        setValue("lectureTitle",subSectionModalData.sectionId.title)
        setValue("lectureDesc",subSectionModalData.sectionId.description)
     }
    },[])

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        
      <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {subSectionModalData.lectureStatusText} Lecture
          </p>
          <button onClick={() => setSubSectionModal(null)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <div >
            <form onSubmit={handleSubmit(handleForm)}
            className="space-y-8 px-8 py-10"
            >
               <SubSectionLecutureUploader
               label={"Lecture Vidio"}
               name={"lectureVidio"}
               register={register}
               errors={errors}
               setValue={setValue}
               />

               {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
             <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {
            !subSectionModalData.view &&
            <div className="flex justify-end">
              <IconButton
                active={true}
                type={"submit"}
                text={"Save"}
              />
            </div>
          }
            </form>
        </div>
      </div>
    </div>
  )
}

export default SubSectionModal
