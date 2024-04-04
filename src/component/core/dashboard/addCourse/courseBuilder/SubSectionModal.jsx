import React, { useEffect } from 'react'
import {RxCross2} from "react-icons/rx"
import { get, useForm } from 'react-hook-form'
import SubSectionLecutureUploader from './SubSectionLecutureUploader'
import IconButton from '../../../../common/IconButton'
import { createSubSection, editCourseDetails, updateSubSection } from '../../../../../service/operation/Course'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'


const SubSectionModal = ({subSectionModalData,setSubSectionModal}) => {

 
   
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
        getValues
    } = useForm()
    const dispatch = useDispatch()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)


    const isFormUpdate = () => {
      const subSectionData = getValues()  
      if(
        subSectionData.lectureTitle !== subSectionModalData.subsectionData.title ||
        subSectionData.lectureDesc !== subSectionModalData.subsectionData.description ||
        subSectionData.lectureVidio !== subSectionModalData.subsectionData.videoUrl
        ){
          return true
        }
        return false
    }

    const handleForm = async(data) => {
        if(subSectionModalData.edit){
          if(isFormUpdate()){
            const formData = new FormData()
            const currentValue = getValues();

            if(currentValue.lectureTitle !== subSectionModalData.subsectionData.title){
               formData.append("title",data.lectureTitle)
            }
            if(currentValue.lectureDesc !== subSectionModalData.subsectionData.description){
              formData.append("description",data.lectureDesc)
           }
           if(currentValue.lectureVideo !== subSectionModalData.subsectionData.videoUrl){
            formData.append("video",data.lectureVidio)
            console.log(data.videoUrl,"thi is selected url")
            }
           formData.append("sectionId",subSectionModalData.sectionId);
           formData.append("subSectionId",subSectionModalData.subsectionData._id);
           
           const result = await updateSubSection(formData,token);

           if(result){
            const updateSection = course.courseContent.map((section) =>
            section._id === result._id ?  result : section
            )
            const updateCourse = {...course,courseContent:updateSection}
            dispatch(setCourse(updateCourse))
            setSubSectionModal(null)
           }


          }else{
            toast.error("No changes made")
          }
          return
        }

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
     if( subSectionModalData.view || subSectionModalData.edit){
        setValue("lectureTitle",subSectionModalData.subsectionData.title)
        setValue("lectureDesc",subSectionModalData.subsectionData.description)
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
               view={subSectionModalData.view ? true : false}
               edit={subSectionModalData.edit? true :false}
               videoUrl= {!subSectionModalData.add ? subSectionModalData.subsectionData.videoUrl : null}
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
              readOnly={subSectionModalData.view ? true : false}
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
              readOnly={subSectionModalData.view ? true : false}
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
                text={subSectionModalData.edit ? "Save Changes" : "Save"}
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
