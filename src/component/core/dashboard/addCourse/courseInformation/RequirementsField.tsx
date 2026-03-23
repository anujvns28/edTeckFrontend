import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementsField = ({label,name,register,setValue,errors}) => {
  const [requirement,setRequirement] = useState();
  const [requirementList,setRequirementList] = useState([]);
  const {editCourse,course} = useSelector((state) => state.course);

  const handleClck = (e) => {
    e.preventDefault()
    if(requirement){
      let arr = [...requirementList,requirement]
      setRequirementList(arr);
    }
  }

  const handleRemoveRequirement = (index) => {
   let arr = [...requirementList]
   arr.splice(index,1)
   setRequirementList(arr);
  }

  useEffect(() => {
    register(name,{required:true})
    if(editCourse){
      setRequirementList(course.instructions)
    }
  },[])
  
  useEffect(() => {
     setValue(name,requirementList)
  },[requirementList])

  return (
    <div>
       <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          onChange={(e) => setRequirement(e.target.value.trim())}
          className="form-style w-full"
        />
        <button
          onClick={handleClck}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}

      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
       
    </div>
  )
}

export default RequirementsField
