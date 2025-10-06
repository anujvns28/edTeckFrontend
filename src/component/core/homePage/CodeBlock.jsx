import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const CodeBlock = ({
    heading,
    subHeading,
    position,
    ctaButton1,
    ctaButton2,
    codeContant,
    codeColor,
 }) => {
  return (
   <div className={`w-full flex ${position} my-20 justify-between `}>
     <div className='w-[50%] flex flex-col gap-4'>
       {heading}
       {subHeading}

       <div className='flex flex-row gap-6 pt-6'>
        {ctaButton1}
        {ctaButton2}
       </div>
    </div>

    {/* running text */}
    <div className='w-[40%]  flex flex-row gap-1 h-fit border border-yellow-400 p-3 '>
    <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
    </div>

       <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
       <TypeAnimation
      sequence={[
        codeContant, 5000 , ' '
      ]}
      wrapper="span"
      style={{ 
        whiteSpace:"pre-line",
       display: 'inline-block'
     }}
      repeat={Infinity}
      cursor={true}
      omitDeletionAnimation={true}
    
    />
       </div>
    </div>
   </div>
  )
}

export default CodeBlock
