import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload
    },
  },
})


export const {setProfile} = profileSlice.actions

export default profileSlice.reducer