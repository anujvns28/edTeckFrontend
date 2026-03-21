import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSubSection, getFullDetailsOfCourse } from '../../../service/operation/Course';
import IconButton from '../../common/IconButton';
import { rootState } from '../../../reducer';
import { Course } from '../../../types/course';
import { Subsection } from '../../../types/sections';

const VideoDetail = () => {
  const { courseId,lectureId} = useParams();
  const { token } = useSelector((state:rootState) => state.auth);
  const [lectureData,setLectureData] = useState<Subsection | null>(null);
  const [courseData,setCourseData] = useState<Course | null>(null);
  const [allLecture,setAllLecture] = useState<string[]>([]);
  const [isRunningLecture,setIsRunningLecture] = useState<boolean>(false);

  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const fetchLectureData = async () => {
    if(lectureId && token){
      const result = await fetchSubSection({subSectionId:lectureId}, token);
      if (result) {
        setLectureData(result.data);
    }
    }
  }

  const fetchCourseData = async() => {
    if(courseId && token){
    const result = await getFullDetailsOfCourse(courseId, token);
    let lectureArr:string[] = []
    if (result) {
       setCourseData(result.data);
       result.data.courseContent.forEach((section) => {
          if (section.subSection.length > 0) {
           section.subSection.forEach((subSection) => {
             lectureArr.push(subSection._id);
           });
         }
       });
       setAllLecture(lectureArr)
    }
    }
  }

  const lectureIndex = () => {
    let arr = [...allLecture] 
    return arr.findIndex((item) => item === lectureId)
  }

  const rewatch = () => {
    if(videoRef.current){
      videoRef.current.play();
      setIsRunningLecture(false)
    }
  }

  const nextLecture = (i:number) => {
    navigate(`/view-course/${courseId}/${allLecture[i+1]}`)
    setIsRunningLecture(false)
  }

  const prevLecture = (i:number) => {
    navigate(`/view-course/${courseId}/${allLecture[i-1]}`)
    setIsRunningLecture(false)
  }

  const handlePlay = () => {
    setIsRunningLecture(false)
  }

  useEffect(() => {
    fetchLectureData();
  }, [lectureId])

  useEffect(() => {
  fetchCourseData();
  },[])

 console.log(lectureIndex(),"lecture index")

  return (
    <div className='w-full h-full flex items-center justify-center  flex-col gap-5 text-white'>
      {
        !lectureData ? <div className='text-white'>Loading...</div>
        : <div className='  overflow-y-hidden'>
          <video
           ref={videoRef}
           className='w-full h-full'
           src={lectureData.videoUrl}
           autoPlay
           controls
           onPlay={handlePlay}
           onEnded={() => setIsRunningLecture(true)}
          />
        </div>
      }
      {
        isRunningLecture && <div
        
        className="border-solid border-black absolute "
      >     
        <IconButton
          text="Rewatch"
          active={true}
          handler={() => rewatch()}
          customClasses="text-xl max-w-max px-4 mx-auto mt-2"
        />
        <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
          {  lectureIndex() > 0 && (
            <button
              onClick={() =>prevLecture(lectureIndex())}
              className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5"
            >
              Prev
            </button>
          )}
          {lectureIndex() < allLecture.length-1 && (
            <button
            onClick={() => nextLecture(lectureIndex())}
              className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5"
            >
              Next
            </button>
          )}
        </div>
      </div>
      }
    </div>
  )
}

export default VideoDetail
