import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { Course } from '../types/course';

type CartType = {
  cart : Course[] ,
  totalAmount : number
}

const initialState: CartType = {
 cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart") as string):[],
 totalAmount: localStorage.getItem("totalAmount") ? JSON.parse(localStorage.getItem("totalAmount") as string):0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<Course>) => {
      const index = state.cart.findIndex((item) => item._id === action.payload._id)
      if(index < 0){
        state.cart.push(action.payload);
        state.totalAmount+=action.payload.price;
        localStorage.setItem("cart",JSON.stringify(state.cart));
        localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
        toast.success("Item Added In Cart")
      }else{
        toast.error("Course already in cart")
      }
    },

    removeToCart:(state,action:PayloadAction<Course>)=> {
      const index = state.cart.findIndex((item) => item._id === action.payload._id)
      state.cart.splice(index,1);
      state.totalAmount -= action.payload.price
      localStorage.setItem("cart",JSON.stringify(state.cart));
      localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
      toast.success("Course removed from cart")
    },

    resetCart:(state)=> {
      state.cart = []
      state.totalAmount = 0
      localStorage.setItem("cart",JSON.stringify(state.cart));
      localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
    }
  },
})


export const {addToCart,removeToCart,resetCart} = cartSlice.actions

export default cartSlice.reducer