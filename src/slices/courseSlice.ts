import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course } from '../types/course'

type CourseTypeSlice = {
  step : number 
  editCourse : boolean,
  course : Course | null
} 

const initialState : CourseTypeSlice = {
 step:1,
 editCourse:false,
 course:null
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setStep: (state, action:PayloadAction<number>) => {
      state.step = action.payload
    },
    setEditCourse:(state,action:PayloadAction<boolean>) => {
      state.editCourse = action.payload
    },
    setCourse:(state,action:PayloadAction<Course>)=>{
      state.course = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})


export const {setStep,setEditCourse,setCourse,resetCourseState} = courseSlice.actions

export default courseSlice.reducer