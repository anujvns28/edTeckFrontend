import toast from "react-hot-toast";
import { settingsEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setProfile } from "../../slices/profileSlice";


const {
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API
} = settingsEndpoints


export const updateProfile = async(data,navigate,dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, 
        data
      )
      console.log("Update Profile API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Profile Updated successfully")
      localStorage.setItem("user",response.data.data)
      dispatch(setProfile(response.data.data))
      
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("Update profile API ERROR............", error)
      toast.error("Something Went Wrong")
    }
    toast.dismiss(toastId)
  }
