import React from 'react'
import IconButton from '../../../../common/IconButton'
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import {MdNavigateNext} from "react-icons/md"
import ChipInput from './ChipInput'
import RequirementsField from './RequirementsField'
import Uploader from '../Uploader'

const CourseInformationForm = () => {
    let errors = {}

  return (
    <form
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
      >

      </select>
      {/* {errors.courseCategory && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course Category is required
        </span>
      )} */}
    </div>
    {/* Course Tags */}
    <ChipInput
      label="Tags"
      name="courseTags"
      placeholder="Enter Tags and press Enter"
    />
    {/* Course Thumbnail Image */}
    <Uploader
      name="courseImage"
      label="Course Thumbnail"
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
    />
    {/* Next Button */}
    <div className="flex justify-end gap-x-2">
      
        <button
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Continue Wihout Saving
        </button>
    
      <IconButton
        text={ "Save Changes"}
      >
        <MdNavigateNext />
      </IconButton>
    </div>
  </form>
  )
}

export default CourseInformationForm
