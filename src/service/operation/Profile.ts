import toast from "react-hot-toast";
import { profileEndpoints, settingsEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { setProfile } from "../../slices/profileSlice";
import { AppDispatch } from "../..";
import { NavigateFunction } from "react-router-dom";
import type { User } from "../../types/user";
import { Course } from "../../types/course";

const {
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
} = settingsEndpoints;

type ApiResponse<T> = {
  success:boolean,
  message?:string
  data:T
}

const { GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } =
  profileEndpoints;

export const updateProfile = async (
  token: string,
  data: FormData,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
) :Promise<void> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<User>>("PUT", UPDATE_PROFILE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Update Profile API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile Updated successfully");

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data),
    );
    dispatch(setProfile(response.data.data));

    navigate("/dashboard/my-profile");
  } catch (error:unknown) {
    console.log("Update profile API ERROR............", error);
    toast.error("Something Went Wrong");
  }
  finally{
    toast.dismiss(toastId);
  }
};

export const updateProfileImg = async (
  data: FormData,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
):Promise<void> => {
  const toastId = toast.loading("Loading...");
  setLoading(true);
  try {
    const response = await apiConnector<ApiResponse<User>>(
      "PUT",
      UPDATE_DISPLAY_PICTURE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
      },
    );
    console.log("Update Profile Img API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile Image Updated successfully");

    localStorage.setItem("user", JSON.stringify(response.data.data));
    dispatch(setProfile(response.data.data));

    navigate("/dashboard/my-profile");
  } catch (error:unknown) {
    console.log("Update profile image API ERROR............", error);
    toast.error("Something Went Wrong");
  }
  finally{
    toast.dismiss(toastId);
    setLoading(false);
  }
};

export const updatePassword = async (data:FormData, navigate:NavigateFunction):Promise<void> => {
  const toastId = toast.loading("Loading...");
  
  try {
    const response = await apiConnector<ApiResponse<User>>("POST", CHANGE_PASSWORD_API, data);
    console.log("Update Password API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password Updated successfully");

    navigate("/dashboard/my-profile");
  } catch (error) {
    console.log("Update Password API ERROR............", error);
    if(error instanceof Error){
      toast.error(error.message);
    }else{
      toast.error("something went wrong")
    }
  }
  finally{
    toast.dismiss(toastId);
  }
};

export async function getUserEnrolledCourses(token:string):Promise<ApiResponse<Course[]> | []> {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course[]>>(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error:unknown) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
    return [];
  }
  finally{
    toast.dismiss(toastId);
  }
  
}

export async function getInstructorData(token:string):Promise<ApiResponse<Course[]>|null> {
  try {
    const response = await apiConnector<ApiResponse<Course[]>>("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
    return response.data;
  } catch (error:unknown) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
    return null
  }

}
