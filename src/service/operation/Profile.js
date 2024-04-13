import toast from "react-hot-toast";
import { profileEndpoints, settingsEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setProfile } from "../../slices/profileSlice";


const {
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,

} = settingsEndpoints

const {GET_USER_ENROLLED_COURSES_API} = profileEndpoints


export const updateProfile = async(token,data,navigate,dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API,data,
      {Authorization: `Bearer ${token}`}
      )
      console.log("Update Profile API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Profile Updated successfully")
      
      localStorage.setItem("user",JSON.stringify(response.data.updatedUserDetails))
      dispatch(setProfile(response.data.updatedUserDetails))
      
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("Update profile API ERROR............", error)
      toast.error("Something Went Wrong")
    }
    toast.dismiss(toastId)
  }


  export const updateProfileImg = async(data,navigate,dispatch,setLoading) => {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, 
        data,{
          "Content-Type": "multipart/form-data",
        }
      )
      console.log("Update Profile Img API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Profile Image Updated successfully")
      
      localStorage.setItem("user",JSON.stringify(response.data.data))
      dispatch(setProfile(response.data.data))
      
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("Update profile image API ERROR............", error)
      toast.error("Something Went Wrong")
    }
    toast.dismiss(toastId)
    setLoading(false)
  }

  export const updatePassword = async(data,navigate,) => {
    const toastId = toast.loading("Loading...")
    let response
    try {
       response = await apiConnector("POST", CHANGE_PASSWORD_API, 
        data
      )
      console.log("Update Password API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Updated successfully")
      
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("Update Password API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }

  export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      // console.log(
      //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      //   response
      // )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
  }
