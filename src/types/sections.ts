
export type Subsection = {
    title : string,
    timeDuration? : string,
    description : string,
    videoUrl : string
    _id : string
}


export type Section = {
    sectionName : string,
    subSection : Subsection[];
    _id : string
}
