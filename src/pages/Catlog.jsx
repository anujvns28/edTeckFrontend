import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { fetchAllCategories } from '../service/operation/Course'
import { getCatalogPageData } from '../service/operation/Catalog'
import Footer from '../component/common/Footer'
import CourseSlider from '../component/core/catalog/CourseSlider'
import CourseCard from '../component/core/catalog/CourseCard'


const Catlog = () => {
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const { catlogName } = useParams()
  const [active, setActive] = useState(1)

  // fetcha all categories
  const fetchCategories = async() => {
    const categories = await fetchAllCategories();
    if(categories){
     const categoryId = categories.data.filter((cat)=>
      cat.name.split(" ").join("-").toLowerCase() === catlogName)[0]._id
     setCategoryId(categoryId)
    }
  }

  // fetch catalog data
 const fetchCatalogData = async() =>{
  const catalogData = await getCatalogPageData(categoryId);
  if(catalogData){
    setCatalogPageData(catalogData)
    console.log(catalogData)
  }
 }

 useEffect(()=>{
  if(categoryId){
    fetchCatalogData();
  }
 },[categoryId])

  useEffect(() => {
   fetchCategories()
  },[catlogName])

  return (
    <div >
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

       {/* Section 1 */}
       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          {/* slider */}
          {
            catalogPageData?.data?.selectedCategory?.courses.length > 0 ? 
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
            : <div className='text-2xl flex items-center justify-center font-bold text-yellow-5 lg:text-2xl'>
              No Couse Found In Selected Categorie
            </div>
          }
        </div>
      </div>

      {/* section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            courses={catalogPageData?.data?.differentCategory?.courses
            }
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

    <Footer/>
    </div>
  )
}

export default Catlog
