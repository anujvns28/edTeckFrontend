import toast from "react-hot-toast"
import {categories, courseEndpoints} from "../api"
import { apiConnector } from "../apiConnector"

const {CATEGORIES_API} = categories
const {CREATE_COURSE_API} = courseEndpoints

// fetching all categories api
export const fetchAllCategories = async() => {
    let result
    try {
      const response = await apiConnector("GET", CATEGORIES_API, 
      )
      result = response.data
      console.log("Geting Categories API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
    } catch (error) {
      console.log("Categories API ERROR............", error)
    }
    return result
  }


  // add the course details
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }