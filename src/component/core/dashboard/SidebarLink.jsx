import React from 'react'
import * as Icons from  "react-icons/vsc"

const SidebarLink = ({data}) => {
    console.log(Icons[data.icon])
    const Icon = Icons[data.icon]
    
  return (
    <div className='flex flex-row gap:2 items-center '>
    <Icon/>
      {data.name}
    </div>
  )
}

export default SidebarLink
