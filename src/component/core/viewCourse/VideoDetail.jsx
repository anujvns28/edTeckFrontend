import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSubSection, getFullDetailsOfCourse } from '../../../service/operation/Course';

const VideoDetail = () => {
  const { courseId ,lectureId} = useParams();
  const { token } = useSelector((state) => state.auth);
  const [lectureData,setLectureData] = useState();
  
  const fetchLectureData = async () => {
    const result = await fetchSubSection({subSectionId:lectureId}, token);
    if (result) {
      setLectureData(result.data);
    }
  }

  useEffect(() => {
    fetchLectureData();
  }, [lectureId])

console.log(lectureData,"this is lecture data")
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {
        !lectureData ? <div className='text-white'>Loading...</div>
        : <div className='w-full h-full overflow-y-hidden'>
          <video
           className='w-full h-full'
           src={lectureData.videoUrl}
           autoPlay
           controls
           onEnded={() => console.log("ended ji")}
          />
        </div>
      }
    </div>
  )
}

export default VideoDetail
