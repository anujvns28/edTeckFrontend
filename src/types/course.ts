import { User } from "./user"

export type Course = {
  _id: string
  courseName: string
  courseDescription: string
  instructor: User
  whatYouWillLearn?: string
  courseContent: string[]
  ratingAndReviews: string[]
  price: number
  thumbnail: string
  tag: string[]
  category?: string
  studentsEnroled: User[]
  instructions?: string[]
  status: "Draft" | "Published"
  createdAt: string
}