import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
 cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")):[],
 totalAmount: localStorage.getItem("totalAmount")?JSON.parse(localStorage.getItem("totalAmount")):0,

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
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
    removeToCart:(state,action)=> {
      const index = state.cart.findIndex((item) => item._id === action.payload._id)
      state.cart.splice(index,1);
      state.totalAmount-=action.payload.price
      localStorage.setItem("cart",JSON.stringify(state.cart));
      localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
      toast.success("Course removed from cart")
    },
    resetCart:(state,action)=> {
      state.cart = []
      state.totalAmount = 0
      localStorage.setItem("cart",JSON.stringify(state.cart));
      localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));
    }
  },
})


export const {addToCart,removeToCart,resetCart} = cartSlice.actions

export default cartSlice.reducer