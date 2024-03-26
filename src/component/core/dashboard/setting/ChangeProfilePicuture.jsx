import React from 'react'
import { useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import IconButton from '../../../common/IconButton'

const ChangeProfilePicuture = () => {
    const {user} = useSelector((state) => state.profile)
  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconButton
                text={"Upload"}
                active={true}
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
