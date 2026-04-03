import { Subsection } from "./sections"

export type ModalData = {
    text1:string,
    text2:string
    btn1:string
    btn2:string,
    handlear1:() => void
    handlear2:() => void
}

export type SubSectionModaldata = {
  lectureStatusText : string,
  view?:boolean,
  sectionId:string,
  subsectionData:Subsection | null,
  edit?:boolean,
  add?:boolean
}