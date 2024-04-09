import React, { useEffect, useState } from 'react'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { fetchCourseDetails } from '../service/operation/Course';
import Footer from '../component/common/Footer';
import {useParams} from "react-router-dom"

const CouseDetails = () => {
  const [couseData,setCouseData] = useState();
  const {couseId} = useParams()

  const fetchCouseData = async() => {
    const result = await fetchCourseDetails(couseId);
    if(result){
      setCouseData(result.data?.courseDetails);
    } 
  }

  useEffect(() => {
    fetchCouseData();
  },[])
  return (
    <>
    <div className={`relative w-full bg-richblack-800`}>
      {/* Hero Section */}
    {
      !couseData ? "loading.." 
      :   <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
      <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
        <div className="relative block max-h-[30rem] lg:hidden">
          <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
          <img
            src={couseData.thumbnail}
            alt="course thumbnail"
            className="aspect-auto w-full"
          />
        </div>
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
              <BiInfoCircle /> Created at 
            </p>
            <p className="flex items-center gap-2">
              {" "}
              <HiOutlineGlobeAlt /> English
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
          <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
            Rs. {couseData.price}
          </p>
          <button className="yellowButton">
            Buy Now
          </button>
          <button className="blackButton">Add to Cart</button>
        </div>
      </div>
      {/* Courses Card */}
      {/* <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
        <CourseDetailsCard
          course={response?.data?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
      </div> */}
    </div> 
    }
    </div>
    
    <Footer />
   
  </>
  )
}

export default CouseDetails
