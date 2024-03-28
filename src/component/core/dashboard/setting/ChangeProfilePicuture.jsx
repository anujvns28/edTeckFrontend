import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import IconButton from '../../../common/IconButton'
import { updateProfileImg } from '../../../../service/operation/Profile'
import { useNavigate } from 'react-router-dom'

const ChangeProfilePicuture = () => {
    const {user} = useSelector((state) => state.profile)
    const [imageFile,setImageFile] = useState();
    const [imagePreveiw,setImagePreview] = useState();
    const [loading,setLoading] = useState();
    
    const inputFileREf = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () =>{
      inputFileREf.current.click();
      console.log(inputFileREf)
    }

    const handleFileChange = (e) =>{
        console.log(e.target.files,"pringing e")
      const file = e.target.files[0]
      if(file){
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
      }
    }

    const handleProfileChange = async() => {
    if(imageFile){
      const data = {
        displayPicture : imageFile,
        userId: user._id
      }
      console.log(data)
      await updateProfileImg(data,navigate,dispatch,setLoading)
    }
    }
    
  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={imagePreveiw ? imagePreveiw :  user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                className="hidden"
                ref={inputFileREf}
                onChange={handleFileChange}
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconButton
                text={loading ? "Uploading.." : "Upload"}
                active={true}
                handlear={handleProfileChange}
              >
                  <FiUpload className="text-lg text-richblack-900" />
                
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangeProfilePicuture
