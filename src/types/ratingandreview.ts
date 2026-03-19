
export type RatingAndReview = {
    course : {
        _id:string,
        courseName:string
    },
    rating : number,
    review : string,
    user:{
        _id:string,
        firstName:string,
        lastName:string,
        email:string,
        image:string
    },
    _id :string
}