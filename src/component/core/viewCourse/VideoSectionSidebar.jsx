import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../service/operation/Course';
import { useSelector } from 'react-redux';
import {IoIosArrowBack} from "react-icons/io"
import {BsChevronDown} from "react-icons/bs"
import IconButton from '../../common/IconButton';
import { MdOutlineOndemandVideo } from "react-icons/md";

const VideoSectionSidebar = () => {
  const { courseId ,lectureId} = useParams();
  const { token } = useSelector((state) => state.auth);
  const [courseDetail, setCourseDetail] = useState();
  const [activeSection,setActiveSection] = useState();

  const navigate = useNavigate();

  const fetchCourseDetail = async () => {
    const result = await getFullDetailsOfCourse(courseId, token);
    if (result) {
      setCourseDetail(result.courseDetails);
       setActiveSection([result.courseDetails.courseContent[0]._id])
    }
  }

  const handleActiveSection = (sectionId) => {
    let arr = [...activeSection];
    const index = arr.findIndex((item) => item === sectionId);
    console.log(index)
    if(index >= 0){
      arr.splice(index,1)
      setActiveSection(arr);
    }else{
      arr.push(sectionId)
      setActiveSection(arr);
    }
  }

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId])

  
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
      {
        !courseDetail ? 
        <div className='w-full h-screen flex items-center justify-center text-white text-xl '>
        Loading...
        </div>
        : <div >
           <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconButton
              active={true}
              text="Add Review"
            />
          </div>
          <div className="flex flex-col ">
            <p>{courseDetail?.courseName}</p>
           
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
        {
          courseDetail.courseContent.map((section,index) => {
            return <div  className="mt-2 cursor-pointer text-sm text-richblack-5">
           <div onClick={() => handleActiveSection(section._id)}
           key={index} className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
            <div className="w-[70%] font-semibold">
              {section?.sectionName}
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`${!activeSection.includes(section._id) ? "rotate-0" : "rotate-180"} transition-all duration-500`}
              >
                <BsChevronDown />
              </span>
            </div>
          </div>
            
            {/* subsection */}
            {
              activeSection.includes(section._id) &&
              <div 
               className="transition-[height] duration-5000 ease-in-out">
              {section.subSection.map((subSection, i) => (
                <div onClick={() => navigate(`/view-course/${courseId}/${subSection._id}`)}
                className={`flex gap-3  px-5 py-2 ${
                  lectureId === subSection._id
                    ? "bg-yellow-200 font-semibold text-richblack-800"
                    : "hover:bg-richblack-900"
                } `}
                  key={i}
                >
                  <MdOutlineOndemandVideo/>
                  {subSection.title}
                </div>
              ))}
            </div>
            }
            </div>
          })
        }
        </div>

        {/* main div */}
        </div>
      }
      </div>
    </>
  )
}

export default VideoSectionSidebar
