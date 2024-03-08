import React, { useState } from 'react'
import HighlightText from './HighlightText'
import {HomePageExplore}  from '../../../data/homepage-explore'
import CourseCard from './CourseCard';

const ExploreMore = () => {
    const [currentTab,setCurrentTab] = useState('Free');
    const [currentTabCourse,setCurrentTabCourse] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(currentTabCourse[0])

    const handleCurrentTAb = (tab,courses) => {
      setCurrentTab(tab);
      setCurrentTabCourse(courses)
    }

    return (
        <div className='text-white pb-52 relative w-11/12 max-w-maxContent mx-auto'>
            <div className="text-4xl font-semibold text-center my-10">
                Unlock the
                <HighlightText text={"Power of Code"} />
                <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
                    Learn to Build Anything You Can Imagine
                </p>
            </div>

            <div className='flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                {HomePageExplore.map((item) => {
                    return <div onClick={() => handleCurrentTAb(item.tag,item.courses)}
                    className={`px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 ${currentTab === item.tag ? "bg-richblack-900 text-richblack-5" : ""}`}>
                       {item.tag}
                    </div>
                })}
            </div>

            <div className='absolute flex flex-row justify-between translate-y-14'>
                {
                    currentTabCourse.map((course) => {
                        return <CourseCard cardData={course} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                    })
                }
            </div>

        </div>
    )
}

export default ExploreMore
