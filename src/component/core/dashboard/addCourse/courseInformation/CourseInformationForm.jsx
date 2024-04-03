import React, { useEffect, useState } from 'react'
import IconButton from '../../../../common/IconButton'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import ChipInput from './ChipInput'
import RequirementsField from './RequirementsField'
import Uploader from './ThumbnailUploader'
import { addCourseDetails, editCourseDetails, fetchAllCategories } from '../../../../../service/operation/Course'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'

const CourseInformationForm = () => {
  const {
  register,
  handleSubmit,
  formState:{errors},
  setValue,
  getValues
  } = useForm();

  const [categories, setCategories] = useState();
  const {editCourse,course} = useSelector((state) => state.course)
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // fetching categories
  const handleCategories = async () => {
    const result = await fetchAllCategories();

    if (result) {
      setCategories(result.data)
    }
  }

  // check form is updated or not
  const isFormUpdated = () => {
   const currentValues = getValues();
   if(
    currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
   ){
    return true
   } else {
    return false
   }
   
  }

  // handle form
  const handleForm = async(data) => {
    console.log("calling")
    if(editCourse){

      if(isFormUpdated()){
        const currentValues = getValues()
        const formData = new FormData()
  
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

      const result = await editCourseDetails(formData,token)
      if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result))

      }

      }else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    const result = await addCourseDetails(formData,token)
    if(result){
      console.log(result)
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
  }

  useEffect(() => {

    if(editCourse){
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    handleCategories();
  }, [])

  

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          className="form-style w-full"
          {...register("courseTitle",{required:true})}
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          className="form-style resize-x-none min-h-[130px] w-full"
          {...register("courseShortDesc",{required:true})}
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            className="form-style w-full !pl-12"
            {...register("coursePrice",{required:true})}
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          className="form-style w-full"
          defaultValue={""}
          {...register("courseCategory",{required:true})}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {
            categories && categories.map((categorie, index) => {
              return <option value={categorie._id} key={index}>{categorie.name}</option>
            })
          }
        </select>
        {errors.courseCategory && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course Category is required
        </span>
      )}
      </div>
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        setValue={setValue}
        errors={errors}
      />
      {/* Course Thumbnail Image */}
      <Uploader
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
      />
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          className="form-style resize-x-none min-h-[130px] w-full"
          {...register("courseBenefits",{required:true})}
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
         {
           editCourse && 
           <button
           onClick={()=> dispatch(setStep(2))}
           className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
         >
           Continue Wihout Saving
         </button>
         }
        <IconButton
          text={editCourse ? "Save Changes" : "Next"}
          active={true}
          type={"submit"}
        >
          <MdNavigateNext />
        </IconButton>
      </div>
    </form>
  )
}

export default CourseInformationForm
