import React from 'react'
import IconButton from '../../common/IconButton'
import {BsFillCaretRightFill} from "react-icons/bs"
import {FaShareSquare} from "react-icons/fa"
import {useSelector} from "react-redux"
import {useNavigate, useParams} from "react-router-dom"
import {toast} from "react-hot-toast"
import { buyCourse } from '../../../service/operation/Payment'

const CourseDetailsCard = ({course,setModalData}) => {

  const navigate = useNavigate()
  const { couseId } = useParams()
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile)

  const handleBuyNow = async() => {
    if(!token){
      setModalData({
        text1:"You are not logged in!?",
        text2:"Please login to Purchase Course.",
        btn1 :'Login',
        btn2:"Cancel",
        handlear1:() => navigate("/login"),
        handlear2:() => setModalData(null)
       })
    }

   await buyCourse({courses:[couseId]},token,user)
  }

  const handleCart = () => {
    if(!token){
      setModalData({
        text1:"You are not logged in!?",
        text2:"Please login to add To Cart",
        btn1 :'Login',
        btn2:"Cancel",
        handlear1:() => navigate("/login"),
        handlear2:() => setModalData(null)
       })
    }
  }
  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={course.thumbnail}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {course.price}
          </div>
          <div className="flex flex-col gap-4">
          <button
            onClick={handleBuyNow}
              className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900"
            >
            Buy Now
            </button>

            <button
            onClick={handleCart}
            className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5">

                Add to Cart
            </button>
           

          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                toast.success("Link copied to clipboard")
              }}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard
