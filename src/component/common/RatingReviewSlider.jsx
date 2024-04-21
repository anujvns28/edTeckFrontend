import React, { useEffect, useState } from 'react'
import { fetchAllRating } from '../../service/operation/Course';
import ReactStars from "react-rating-stars-component";

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"


const RatingReviewSlider = () => {
    const [ratings, setRatings] = useState();
    const truncateWords = 15
    const getAllRating = async () => {
        const result = await fetchAllRating();
        if (result) {
            setRatings(result)
        }
    }

    useEffect(() => {
        getAllRating();
    }, [])


    return (
        <div className="text-white">
            {ratings && <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="w-full "
                >
                    {ratings.map((review, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review.user.image}
                                            alt=""
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                            <h2 className="text-[12px] font-medium text-richblack-500">
                                                {review?.course?.courseName}
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="font-medium text-richblack-25">
                                        {`${review?.review}`}
                                    </p>
                                    <div className="flex items-center gap-2 ">
                                        <h3 className="font-semibold text-yellow-100">
                                            {review.rating}
                                        </h3>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            edit={false}
                                            value={review.rating}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />

                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>}
        </div>
    )
}

export default RatingReviewSlider
