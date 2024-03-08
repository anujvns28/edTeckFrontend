import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import image from "../../../assets/Images/TimelineImage.png"


const TimelineSection = () => {
  const timeLineData = [
    {
        Logo: logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
      },
      {
        Logo: logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
      },
      {
        Logo: logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
      },
      {
        Logo: logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
      },
  ]
  return (
    <div className='flex  px-8 flex-row w-11/12 pb-20 max-w-maxContent mx-auto items-center justify-between'>
      <div className='flex flex-col gap-3 '>
        {
            timeLineData.map((item,index) =>{
                return <div key={index} className='flex flex-row gap-4 '>
                  <div className='flex flex-col h-full  items-center gap-3 '>
                  <div className='w-[60px] flex h-[60px] rounded-full bg-white items-center justify-center'>
                    <img src={item.Logo}/>
                   </div>
                   {timeLineData.length-1 !== index && <div className='border-r border-richblack-100 border-dotted h-[40px] w-[1px]'></div>}
                  </div>
                   <div className='flex flex-col gap-1'>
                    <h1 className='font-semibold text-lg'>{item.Heading}</h1>
                    <p>{item.Description}</p>
                   </div>
                </div>
            })
        }
      </div>
      
      <div className='shadow-[10px_-5px_50px_-5px] shadow-blue-200 relative'>
        <img className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-[450px]'
        src={image}
        />

        <div className='absolute -bottom-14 right-6 bg-caribbeangreen-700 flex flex-row w-[90%] mx-auto py-8 items-center justify-around'>
           <div className='flex items-center justify-around  w-[40%] '>
            <p className='text-4xl font-semibold text-white'>10</p>
            <p className='text-caribbeangreen-300'>YEARS <pre/> EXPERIENCES</p>
           </div>

          <div className='border-r border-caribbeangreen-300  h-[35px]'></div>

           <div className='flex items-center justify-around w-[40%] '>
           <p className='text-4xl font-semibold text-white'>250</p>
            <p className='text-caribbeangreen-300'>TYPES <pre/> OF COURSES</p>
           </div>

        </div>
      </div>
    </div>
  )
}

export default TimelineSection
