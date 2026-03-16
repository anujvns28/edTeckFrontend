import { Course } from "./course"

export type Profile = {
    gender : string | null,
    dateOfBirth : string | null,
    about : string | null
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  accountType: "Admin" | "Student" | "Instructor"
  additionalDetails: Profile,
  courses: Course[]
  token?: string
  resetPasswordExpires?: string
  image?: string
  courseProgress: string[]
}


