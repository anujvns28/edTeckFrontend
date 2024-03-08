import React from 'react'
import image1 from "../../../assets/Images/Know_your_progress.svg";
import image2 from "../../../assets/Images/Compare_with_others.svg";
import image3 from "../../../assets/Images/Plan_your_lessons.svg";
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';


const LearningLanguageSection = () => {
  return (
    <div className='w-11/12 pb-14 max-w-maxContent mx-auto flex flex-col items-center mt-14 '>
      <div className='text-4xl font-bold'>
      Your swiss knife for <HighlightText text={"learning any language"} />
      </div>
      <div className="text-center text-richblack-700 font-medium lg:w-[65%] mx-auto  leading-6 text-base mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
     </div>

     <div className='flex flex-row'>
        <img
         src={image1}
         className="object-contain  lg:-mr-36 "
         />
        <img src={image2}
        className="object-contain  lg:-mr-36 "
        />
        <img src={image3}
        className="object-contain  lg:-mr-36 "
        />
     </div>

     <CTAButton active={true} location={"/signup"} > Learn More</CTAButton>
    </div>
  )
}

export default LearningLanguageSection
