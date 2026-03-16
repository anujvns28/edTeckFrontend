import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token : string | null,
  signupData: null
}

const initialState : AuthState = {
  token: localStorage.getItem("token") 
  ? JSON.parse(localStorage.getItem("token") as string) : null,
  signupData : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action:PayloadAction<string | null>) => {
      state.token = action.payload
    },
    setSignupData : (state,action:PayloadAction<any>) => {
      state.signupData = action.payload 
    },
  },
})


export const {setToken,setSignupData} = authSlice.actions

export default authSlice.reducer