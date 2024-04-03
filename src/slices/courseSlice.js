import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 step:localStorage.getItem("course") ? 2 : 1,
 editCourse:false,
 course:localStorage.getItem("course")? JSON.parse(localStorage.getItem("course")) : null
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setEditCourse:(state,action) => {
      state.editCourse = action.payload
    },
    setCourse:(state,action)=>{
      state.course = action.payload
    }
  },
})


export const {setStep,setEditCourse,setCourse} = courseSlice.actions

export default courseSlice.reducer