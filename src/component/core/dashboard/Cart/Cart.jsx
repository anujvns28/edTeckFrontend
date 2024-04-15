import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"


export default function Cart() {
  const { totalAmount,cart} = useSelector((state) => state.cart)
  

  

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {cart.length} Courses in Cart
      </p>
      {totalAmount > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div> 
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </>
  )
}
