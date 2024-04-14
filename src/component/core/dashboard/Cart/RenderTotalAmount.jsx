import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconButton from "../../../common/IconButton"
import { buyCourse } from "../../../../service/operation/Payment"


export default function RenderTotalAmount() {
  const { totalAmount, cart } = useSelector((state) => state.cart)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.profile);
  const {token} = useSelector((state) => state.auth);

  const handleBuyNow = async() => {
    let courses = []
    cart.map((course) => courses.push(course._id));
    await buyCourse({courses:courses},token,user,navigate,dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {totalAmount}</p>
      <IconButton
      handlear={handleBuyNow}
        active={true}
        text="Buy Now"
      />
    </div>
  )
}
