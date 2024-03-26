import React from 'react'
import ChangeProfilePicuture from './ChangeProfilePicuture'
import EditProfile from './EditProfile'
import DeleteAccoutn from './DeleteAccoutn'
import UpdatePassword from './UpdatePassword'

const Setting = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicuture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
       <UpdatePassword/>
      {/* Delete Account */}
      <DeleteAccoutn />
    </>
  )
}

export default Setting
