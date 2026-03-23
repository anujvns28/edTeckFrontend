import { Category } from "./category";
import type { Section } from "./sections";
import type { User } from "./user";

export type Course = {
  _id: string;
  courseName: string;
  courseDescription: string;
  instructor: User;
  whatYouWillLearn?: string;
  courseContent: Section[];
  ratingAndReviews: string[];
  price: number;
  thumbnail: string;
  tag: string[];
  category?: Category;
  studentsEnroled: string[];
  instructions?: string[];
  status: "Draft" | "Published";
  createdAt: string;
};
