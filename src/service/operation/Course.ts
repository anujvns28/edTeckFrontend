import toast from "react-hot-toast"
import {categories, courseEndpoints, ratingEndpoints} from "../api"
import { apiConnector } from "../apiConnector"
import type {Category } from "../../types/category"
import  type {Course } from "../../types/course"
import type { Section } from "../../types/sections";
import type { RatingAndReview } from "../../types/ratingandreview";

const { CATEGORIES_API } = categories;
const {
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  DELETE_SECTION_API,
  UPDATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  COURSE_DETAILS_API,
  FETCh_SUBSECTION_API,
  CREATE_RATING_API,
} = courseEndpoints;

const { GET_ALLRATTING_API, GET_AVERAGERATTING_API } = ratingEndpoints;

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

type RatingResponse = {
  success: boolean;
  message: string;
  ratingReview: {
    course: string;
    rating: boolean;
    review: string;
    user: string;
    _id: string;
  };
};

type AvarageRatingResponse = {
  averageRating: number;
  success: boolean;
};

// fetching all categories api => ts done
export const fetchAllCategories = async (): Promise<ApiResponse<
  Category[]
> | null> => {
  try {
    const response = await apiConnector<ApiResponse<Category[]>>(
      "GET",
      CATEGORIES_API,
    );
    console.log("Geting Categories API RESPONSE UP............", response);

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch categories");
    }

    return response.data;
  } catch (error: unknown) {
    console.log("Categories API ERROR............", error);
    return null;
  }
};

// add the course details => ts done

export const addCourseDetails = async (
  data: FormData,
  token: string,
): Promise<ApiResponse<Course> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course>>(
      "POST",
      CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Added Successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("smothing went wrong");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// edit course
export const editCourseDetails = async (
  data: FormData,
  token: string,
): Promise<ApiResponse<Course> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course>>(
      "POST",
      EDIT_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    return response.data;
  } catch (error: unknown) {
    console.log("EDIT COURSE API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Could Not Update Course Details");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

export const createSection = async (
  data: any,
  token: string,
): Promise<ApiResponse<Course> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course>>(
      "POST",
      CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("CREATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }
    toast.success("Course Section Created");
    return response.data;
  } catch (error: unknown) {
    console.log("CREATE SECTION API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong ");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// delete a section
export const deleteSection = async (
  data: any,
  token: string,
): Promise<ApiResponse<Course> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course>>(
      "POST",
      DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Course Section Deleted");
    return response.data;
  } catch (error: unknown) {
    console.log("DELETE SECTION API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// update a section
export const updateSection = async (
  data: any,
  token: string,
): Promise<ApiResponse<Course> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course>>(
      "POST",
      UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    return response.data;
  } catch (error: unknown) {
    console.log("UPDATE SECTION API ERROR............", error);
    if (error instanceof Error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("something went wrong");
      }
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// create a subsection
export const createSubSection = async (
  data: FormData,
  token: string,
): Promise<ApiResponse<Section> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Section>>(
      "POST",
      CREATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    return response.data;
  } catch (error: unknown) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("smoething went wrong");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// update a subsection
export const updateSubSection = async (
  data: FormData,
  token: string,
): Promise<ApiResponse<Section> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Section>>(
      "POST",
      UPDATE_SUBSECTION_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("UPDATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated");
    return response?.data;
  } catch (error: unknown) {
    console.log("UPDATE SUB-SECTION API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// delete a subsection
export const deleteSubSection = async (
  data: FormData,
  token: string,
): Promise<ApiResponse<Section> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Section>>(
      "POST",
      DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    return response.data;
  } catch (error: unknown) {
    console.log("DELETE SUB-SECTION API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (
  token: string,
): Promise<ApiResponse<Course[]> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course[]>>(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("INSTRUCTOR COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    return response.data;
  } catch (error: unknown) {
    console.log("INSTRUCTOR COURSES API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// delete a course
export const deleteCourse = async (data: any, token: string): Promise<void> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<null>>(
      "DELETE",
      DELETE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("DELETE COURSE API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted");
  } catch (error: unknown) {
    console.log("DELETE COURSE API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong");
    }
  }
  toast.dismiss(toastId);
};

// get full details of a course
export const getFullDetailsOfCourse = async (
  courseId: string,
  token: string,
): Promise<ApiResponse<Course> | null> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<ApiResponse<Course>>(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error: unknown) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

export const fetchCourseDetails = async (
  courseId: string,
): Promise<ApiResponse<Course> | null> => {
  try {
    const response = await apiConnector<ApiResponse<Course>>(
      "POST",
      COURSE_DETAILS_API,
      {
        courseId,
      },
    );
    console.log("COURSE_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    console.log("COURSE_DETAILS_API API ERROR............", error);
    return null;
  }
};

// fetching all categories api
export const fetchSubSection = async (
  data: { subSection: string },
  token: string,
): Promise<any | null> => {
  try {
    const response = await apiConnector<any>(
      "POST",
      FETCh_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("Geting lecture API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log("lecture API ERROR............", error);
    return null;
  }
};

// create a rating for course
export const createRating = async (
  data: any,
  token: string,
): Promise<boolean> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector<RatingResponse>(
      "POST",
      CREATE_RATING_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log("CREATE RATING API RESPONSE............", response);
    if (!response.data.success) {
      throw new Error("Could Not Create Rating");
    }
    toast.success("Rating Created");
    return true;
  } catch (error: unknown) {
    console.log("CREATE RATING API ERROR............", error);
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("something went wrong");
    }
    return false;
  } finally {
    toast.dismiss(toastId);
  }
};

// Get all rating for course
export const fetchAllRating = async (): Promise<ApiResponse<
  RatingAndReview[]
> | null> => {
  try {
    const response = await apiConnector<ApiResponse<RatingAndReview[]>>(
      "GET",
      GET_ALLRATTING_API,
    );
    console.log("get all RATING API RESPONSE............", response);
    return response.data;
  } catch (error: unknown) {
    console.log("CREATE RATING API ERROR............", error);
    return null;
  }
};

// Get all rating for course
export const fetchAverageRatting = async (
  data: string,
): Promise<AvarageRatingResponse | null> => {
  try {
    const response = await apiConnector<AvarageRatingResponse>(
      "POST",
      GET_AVERAGERATTING_API,
      { courseId: data },
    );
    console.log("get average RATING API RESPONSE............", response);
    return response.data;
  } catch (error) {
    console.log("average RATING API ERROR............", error);
    return null;
  }
};


