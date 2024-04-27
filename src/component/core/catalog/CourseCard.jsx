import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAverageRatting } from '../../../service/operation/Course';
import ReactStars from "react-rating-stars-component";

const CourseCard = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState();
  const [loading,setLoading] = useState(false)

  const getAverageRatting = async () => {
    setLoading(false)
    const result = await fetchAverageRatting(course._id)
    if (result) {
      setAvgReviewCount(result.averageRating);
      setLoading(true)
    }
  }

  console.log(avgReviewCount,"course,,,")

  useEffect(() => {
    getAverageRatting();
  }, [])
  return (
    <div>
      <>
        <Link to={`/courses/${course._id}`}>
          <div className="">
            <div className="rounded-lg">
              <img
                src={course?.thumbnail}
                alt="course thumnail"
                className={`${Height} w-full rounded-xl object-cover `}
              />
            </div>
            
            <div className="flex flex-col gap-2 px-1 py-3">
              <p className="text-xl text-richblack-5">{course?.courseName}</p>
             
            {
              loading && 
                 
              <div className="text-md flex flex-wrap items-center  gap-2">
              <span className="text-yellow-25">{avgReviewCount || 0}</span>
              <ReactStars
                count={5}
                size={24}
                edit={false}
                value={avgReviewCount || 0}
                emptyIcon={<i className="far fa-star"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>
            }
             
              <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
            </div>
          </div>
        </Link>
      </>
    </div>
  )
}

export default CourseCard
