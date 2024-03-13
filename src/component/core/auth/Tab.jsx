import React from 'react'

const Tab = ({tab,setTab}) => {
  

  return (
    <div 
    style={{
      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
    }}
    className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
      <div onClick={() => setTab("Student")}
       className={`${
        tab === "Student"
          ? "bg-richblack-900 text-richblack-5"
          : "bg-transparent text-richblack-200"
      } py-2 px-5 rounded-full transition-all duration-200  cursor-pointer`}>
        Student
      </div>

      <div onClick={() => setTab("Instuctor")}
      className={`${
        tab === "Instuctor"
          ? "bg-richblack-900 text-richblack-5"
          : "bg-transparent text-richblack-200"
      } py-2 px-5 rounded-full transition-all duration-200 cursor-pointer`}>
        Insturctor
      </div>
    </div>
  )
}

export default Tab
