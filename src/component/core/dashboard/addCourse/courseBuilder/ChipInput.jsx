import React, { useEffect, useState } from 'react'
import {MdClose} from "react-icons/md"

const ChipInput = ({label,name,placeholder}) => {
  const [tags,setTags] = useState([]);
  

  const handleKeyDown = (e) => {
   if(e.key === "Enter" || e.key === ","){
    e.preventDefault();
     const tag = e.target.value.trim()
     if(!tags.includes(tag) && tag){
      let tagValues = [];
      tagValues = [...tags,tag];
      setTags(tagValues)
      e.target.value = ''
     }
   }
  }

  const handleDeleteChip = (index) => {
  const newTags = [...tags]
  newTags.splice(index,1)
  console.log(newTags,"this is new tags")
  setTags(newTags)
  }

  useEffect(() => {
    
  },[tags])


  return (
    <div>
      <label className="text-sm text-richblack-5" htmlFor="coursePrice">
       {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {tags.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
      className='form-style'
       placeholder={placeholder}
       name={name}
       onKeyDown={handleKeyDown}
      />
      </div>
    </div>
  )
}

export default ChipInput
