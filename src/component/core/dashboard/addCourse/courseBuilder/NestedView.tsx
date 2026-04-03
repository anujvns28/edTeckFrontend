import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {MdEdit} from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import {FaPlus} from "react-icons/fa"
import {AiFillCaretDown} from "react-icons/ai"
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../service/operation/Course'
import { setCourse } from '../../../../../slices/courseSlice'
import SubSectionModal from './SubSectionModal'
import { rootState } from '../../../../../reducer'
import { ModalData, SubSectionModaldata } from '../../../../../types/modalData'
import { Course } from '../../../../../types/course'

type EditSectionInfromationProps = {
  editSectionInformation:(sectionName:string,sectionId:string) => void
}

const NestedView = ({editSectionInformation}:EditSectionInfromationProps) => {
  const {course} = useSelector((state:rootState) => state.course);

  const [modalData,setModalData] = useState<ModalData | null>(null);
  const [subSectionModal,setSubSectionModal] = useState<SubSectionModaldata | null>(null);
  const {token} = useSelector((state:rootState) => state.auth)
  const dispatch = useDispatch();

  const handleDeleteSection = async(sectionId:string) => {
    if(!course || !token) return;
    const result = await deleteSection({
      sectionId:sectionId,
      courseId:course._id
    },token)

   if(result){
    dispatch(setCourse(result.data))
    setModalData(null)
   }
  }

  const handleDeleteSubSection = async(sectionId:string,sebSectionId:string)=>{
    if(!token) return;
    const result = await deleteSubSection({
      sectionId:sectionId,
      subSectionId:sebSectionId
    },
    token)

    setModalData(null)

    if(result && course){
      const updateSection = course.courseContent.map((section) =>
            section._id === result.data._id ?  result : section
            )
            const updateCourse = {...course,courseContent:updateSection}
            dispatch(setCourse(updateCourse as Course))
    }
  }


  return (
    <> 
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                onClick={() => editSectionInformation(section.sectionName,section._id)}
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                 onClick={() => setModalData({
                  text1:"Delete this Section?",
                  text2:"All the lectures in this section will be deleted",
                  btn1:"Delete",
                  btn2:"Cancel",
                  handlear1:() => handleDeleteSection(section._id),
                  handlear2:() => setModalData(null)
                 })}
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div 
                  onClick={() => setSubSectionModal({
                    lectureStatusText : "Viewing",
                    view:true,
                    sectionId:section._id,
                    subsectionData:data,
                    
                  })}
                  className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-x-3"
                  >
                    <button
                    onClick={() => setSubSectionModal({
                      lectureStatusText : "Editing",
                      edit:true,
                      sectionId:section._id,
                      subsectionData:data
                    })}
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                     onClick={() => setModalData({
                      text1:"Delete this Sub-Section?",
                      text2:"This lecture will be deleted",
                      btn1:"Delete",
                      btn2:"Cancel",
                      handlear1:() => handleDeleteSubSection(section._id,data._id),
                      handlear2:() => setModalData(null)
                     })}
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <button
               onClick={() => setSubSectionModal({
                lectureStatusText:"Adding",
                add:true,
                sectionId:section._id,
                subsectionData: null
               })}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {/* confirmation modal */}
      {
        modalData && 
        <ConfirmationModal
        modalData={modalData}
       />
      }
      {/* subSection modal */}
       {
        subSectionModal && 
        <SubSectionModal 
         subSectionModalData={subSectionModal}
         setSubSectionModal={setSubSectionModal}
        />
       }
    </>
  )
}

export default NestedView
