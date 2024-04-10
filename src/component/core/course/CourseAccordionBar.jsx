import React from 'react'
import { AiOutlineDown } from "react-icons/ai"
import Subsection from './Subsection'


const CourseAccordionBar = ({course,isActive,setIsActive}) => {
    console.log(isActive)
  return (
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
    <div>
      <div
      onClick={() => isActive == course._id ? setIsActive(null) : setIsActive(course._id)}
        className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
      >
        <div className="flex items-center gap-2">
          <i
            className={
              `${isActive === course._id ? "rotate-180" : "rotate-0"}`
            }
          >
            <AiOutlineDown />
          </i>
          <p>{course?.sectionName}</p>
        </div>
        <div className="space-x-4">
          <span className="text-yellow-25">
            {`${course.subSection.length || 0} lecture(s)`}
          </span>
        </div>
      </div>
    </div>

    <div
      className={`relative ${isActive === course._id ? `h-[80px]${course.subSection.length}` : "h-0"} overflow-hidden bg-richblack-900 transition-all duration-1000 ease-[ease]`}
    >
      <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
        {course?.subSection?.map((subSec, i) => {
          return <Subsection subSec={subSec} key={i} />
        })}
      </div>
    </div>
  </div>
  )
}

export default CourseAccordionBar
