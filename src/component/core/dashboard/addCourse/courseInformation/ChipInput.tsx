import React, { useEffect, useState } from 'react'
import {MdClose} from "react-icons/md"
import { useSelector } from 'react-redux';

const ChipInput = ({label,name,placeholder,register,setValue,errors}) => {
  const [tags,setTags] = useState([]);
  const {course,editCourse} = useSelector((state) => state.course);

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
    register(name,{required:true})
    if(editCourse){
      setTags(course.tag)
    }
  },[])

  useEffect(() => {
   setValue(name,tags)
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
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default ChipInput
