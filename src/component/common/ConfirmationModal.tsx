import React from 'react'
import IconButton from './IconButton'

type ModalData = {
  text1:string,
  text2:string,
  btn1:string,
  btn2:string,
  handlear1:() =>void,
  handlear2:() =>void
}

type ModalDataProps = {
  modalData: ModalData | null;
}

const ConfirmationModal = ({modalData}:ModalDataProps) => {
  if (!modalData) return null;

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconButton 
          text={modalData.btn1}
          active={true} 
          handler={modalData.handlear1}/>

          <IconButton 
          text={modalData.btn2} 
          active={false} 
          handler={modalData.handlear2} />
          
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
