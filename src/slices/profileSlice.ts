import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user'

type ProfileType  = {
  user: User | null 
}

const initialState : ProfileType = {
 user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string): null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action:PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})


export const {setProfile} = profileSlice.actions

export default profileSlice.reducer