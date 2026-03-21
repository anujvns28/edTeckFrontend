import React from 'react'
import { HiOutlineVideoCamera } from "react-icons/hi"
import type { Subsection } from '../../../types/sections'

type SubSecType = {
  subSec:Subsection
}

const SubsectionCom = ({subSec}:SubSecType) => {
  return (
    <div>
    <div className="flex justify-between py-2 ">
      <div className={`flex items-center gap-2`}>
        <span>
          <HiOutlineVideoCamera />
        </span>
        <p>{subSec.title}</p>
      </div>
    </div>
  </div>
  )
}

export default SubsectionCom
