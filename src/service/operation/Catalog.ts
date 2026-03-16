import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { catalogData } from "../api"
import { Course } from "../../types/course";

type CatalogResponse = {
  success: boolean;
  data: {
    differentCategory : {
      courses : Course[],
      description : string,
      name : string,
      _id : string 
    }, 
    mostSellingCourses : Course[],
    selectedCategory : {
      courses : Course[],
      description : string,
      name : string,
      _id : string 
    }
  }
  message?: string;
};

export const getCatalogPageData = async (categoryId:string):Promise<CatalogResponse | null> => {
  const toastId = toast.loading("Loading...")
  let result : CatalogResponse | null = null
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    console.log("CATALOGPAGEDATA_API API............", response.data)

    result = response?.data
  } catch (error:any) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}


