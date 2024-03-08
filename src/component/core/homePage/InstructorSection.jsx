import React from 'react'
import image from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
    return (
        <div className='w-11/12 py-20 max-w-maxContent mx-auto gap-20 flex flex-row justify-between'>
            <div className='w-[50%]'>
                <img src={image}
                 className="shadow-white shadow-[-20px_-20px_0_0]"
                />
            </div>

            <div className='flex w-[50%] flex-col gap-10 justify-center'>
                <div className='text-4xl font-bold text-white'>
                    Become <pre />
                    <HighlightText text={"an instructor"} />
                </div>
                <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                    Instructors from around the world teach millions of students on
                    StudyNotion. We provide the tools and skills to teach what you
                    love.
                </p>
                <div className='w-fit'>
                <CTAButton active={true} location={"/signup"} >
                <div className="flex items-center gap-3 ">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
                </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection
