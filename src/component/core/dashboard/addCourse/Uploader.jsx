import React, { useEffect, useRef, useState } from 'react'
import {FiUploadCloud} from "react-icons/fi"
import { useSelector } from 'react-redux';

const Uploader = ({setValue,register,name,label,errors}) => {
  const [selectedFile,setSelectedFile] = useState();
  const [preViewFile,setPreViewFile] = useState();
  const {course,editCourse} = useSelector((state) =>state.course)

  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click()
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    setPreViewFile(URL.createObjectURL(file));
    setSelectedFile(file)
    setValue(name,file)
  }

  useEffect(() => {
   register(name,{required:true})
   if(editCourse){
    setPreViewFile(course.thumbnail)
   }
  }, [])


  return (
  <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} 
      </label>
    <div className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500">
        {
          preViewFile ? 
          <div className="flex w-full flex-col p-6">
              <img
                src={preViewFile}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
              <button
                onClick={() => {
                  setPreViewFile(null);
                  setSelectedFile(null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
          </div>

          : <div
          onClick={handleClick}
          className="flex w-full flex-col items-center p-6"
        >
          <input 
          ref={inputRef}
          onChange={handleChange}
          type='file'
          className='invisible'/>

          <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
            <FiUploadCloud className="text-2xl text-yellow-50" />
          </div>
          <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
            Drag and drop an  image , or click to{" "}
            <span className="font-semibold text-yellow-50">Browse</span> a
            file
          </p>
          <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
            <li>Aspect ratio 16:9</li>
            <li>Recommended size 1024x576</li>
          </ul>
        </div>
        }
    </div>
    {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
  </div>
  )
}

export default Uploader
