import React, { useEffect, useState } from 'react'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { fetchCourseDetails } from '../service/operation/Course';
import Footer from '../component/common/Footer';
import { useParams } from "react-router-dom"
import CourseDetailsCard from '../component/core/course/CourseDetailsCard';
import ReactMarkdown from "react-markdown"
import CourseAccordionBar from '../component/core/course/CourseAccordionBar';
import {useSelector} from "react-redux"
import ConfirmationModal from "../component/common/ConfirmationModal"

const CouseDetails = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile)
  const [couseData, setCouseData] = useState();
  const [isActive,setIsActive] = useState([]);
  const { couseId } = useParams()

  const [modalData,setModalData] = useState();
  const [loading,setLoading] = useState(false);

  const fetchCouseData = async () => {
    setLoading(true)
    const result = await fetchCourseDetails(couseId);
    if (result) {
      setCouseData(result.data?.courseDetails);
    }
    setLoading(false)
  }

  const handleActive = (section_id) => {
    let arr = [...isActive]
   const index =  arr.findIndex((item) => item == section_id);
   
   if(index >= 0){
    arr.splice(index,1)
    setIsActive(arr);
   }else{
    arr.push(section_id);
    setIsActive(arr);
   }
   }
  
  console.log(isActive,"pritng is active")

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return dateObject.toLocaleDateString('en-US', options);
  };


  useEffect(() => {
    fetchCouseData();
  }, [])

  return (
    <>
      <div className={`relative w-full bg-richblack-800 `}>
        {/* Hero Section */}
        {
          !couseData ? <div className='flex items-center text-white text-xl justify-center w-screen h-screen'>Loading...</div>
            : <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
              <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

                <div
                  className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                >
                  <div>
                    <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                      {couseData.courseName}
                    </p>
                  </div>
                  <p className={`text-richblack-200`}>{couseData.courseDescription}</p>
                  {/* <div className="text-md flex flex-wrap items-center gap-2">
            <span className="text-yellow-25">{avgReviewCount}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
            <span>{`(${ratingAndReviews.length} reviews)`}</span>
            <span>{`${studentsEnroled.length} students enrolled`}</span>
          </div> */}
                  <div>
                    <p className="">
                      Created By {`${couseData.instructor.firstName} ${couseData.instructor.lastName}`}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-5 text-lg">
                    <p className="flex items-center gap-2">
                      {" "}
                      <BiInfoCircle /> Created at {" "} {formatDate(couseData.createdAt)}
                    </p>
                    <p className="flex items-center gap-2">
                      {" "}
                      <HiOutlineGlobeAlt /> English
                    </p>
                  </div>
                </div>
                
              </div>
              {/* Courses Card */}
              <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                <CourseDetailsCard
                  course={couseData}
                  setModalData={setModalData}
                />
              </div>
            </div>
        }
      </div>


      {
        couseData &&
        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
            {/* What will you learn section */}
            <div className="my-8 border border-richblack-600 p-8">
              <p className="text-3xl font-semibold">What you'll learn</p>
              <div className="mt-5">
                <ReactMarkdown>{couseData.whatYouWillLearn}</ReactMarkdown>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="max-w-[830px]  ">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] font-semibold">Course Content</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <span>
                      {couseData.courseContent.length} {`section(s)`}
                    </span>
                    <span>
                      {couseData.totalNoOfLectures} 10 {`lecture(s)`}
                    </span>
                    <span>{couseData.totalDuration} 10s total length</span>
                  </div>
                  <div>
                    <button
                      className="text-yellow-25"
                      onClick={() => setIsActive([])}
                    >
                      Collapse all sections
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Details Accordion */}
              <div className="py-4">
                {couseData.courseContent?.map((course, index) => (
                  <CourseAccordionBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>

              {/* Author Details */}
              <div className="mb-12 py-4">
                <p className="text-[28px] font-semibold">Author</p>
                <div className="flex items-center gap-4 py-4">
                  <img
                    src={
                      couseData.instructor.image
                    }
                    alt="Author"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <p className="text-lg">{`${couseData.instructor.firstName} ${couseData.instructor.lastName}`}</p>
                </div>
                <p className="text-richblack-50">
                  {couseData.instructor?.additionalDetails?.about}
                </p>
              </div>

            </div>


          </div>
        </div>
      }

      {modalData && <ConfirmationModal modalData={modalData}/> }
      <Footer />

    </>
  )
}

export default CouseDetails
