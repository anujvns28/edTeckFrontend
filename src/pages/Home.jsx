import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import HighlightText from '../component/core/homePage/HighlightText'
import CTAButton from '../component/core/homePage/CTAButton'
import banner from "../assets/Images/banner.mp4"
import CodeBlock from '../component/core/homePage/CodeBlock'
import Footer from '../component/common/Footer'
import ExploreMore from '../component/core/homePage/ExploreMore'

const Home = () => {
    return (
        <div className='w-full h-full'>
            {/* section 1 */}
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between  text-white '>
                {/* become insturctor button */}
                <Link to={"/signup"}>
                    <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                            Become an insturctor
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className="text-center text-white text-4xl font-semibold py-8">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                {/* Sub Heading */}
                <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300 mx-auto">
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                <div className="mt-8 flex flex-row gap-7 mx-auto">
                    <CTAButton active={true} location={"/signup"}>Learn More</CTAButton>
                    <CTAButton active={false} location={'/login'}>Book a Demo</CTAButton>
                </div>

                {/* vidio */}
                <div className="mx-3 my-16 shadow-[10px_-5px_50px_-5px] shadow-blue-200 ">
                    <video
                        className="shadow-[20px_20px_rgba(255,255,255)]"
                        muted
                        loop
                        autoPlay
                        src={banner}
                    />
                </div>


                <CodeBlock
                    position={"flex-row"}
                    heading={<div className='text-4xl font-semibold '>
                        Unlock your
                        <HighlightText text={"coding potential"} />
                        with our online courses.
                    </div>}

                    subHeading={<div className=' text-lg font-bold text-richblack-300'>
                        Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                    </div>}

                    ctaButton1={<div>
                        <CTAButton active={true} location={"/signup"}>
                            <div className='flex flex-row gap-2 items-center '>
                                Try it Yourself
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>}

                    ctaButton2={<div>
                        <CTAButton active={false} location={"/login"}>
                            <div className='flex flex-row gap-2 items-center '>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>}

                    codeContant={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    codeColor={"text-yellow-25"}

                />

                <CodeBlock
                    position={"flex-row-reverse"}
                    heading={<div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={" coding in"} />
                        <pre />
                        <HighlightText text={"seconds"} />
                    </div>}
                    subHeading={<div className='text-lg font-bold text-richblack-300'>
                        Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                    </div>}
                    ctaButton1={<div>
                        <CTAButton active={true} location={"/signup"}>
                            <div className='flex flex-row gap-2'>
                                Continue Lesson
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>}
                    ctaButton2={<div>
                        <CTAButton active={false} location={"/login"}>
                            Learn More
                        </CTAButton>
                    </div>}
                    codeColor={"text-white"}
                    codeContant={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                />

            </div>

            <ExploreMore />

            {/* section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700 ">
                <div className='homePage_bg h-[320px]'>
                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
                        <div className="lg:h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white lg:mt-8">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-2">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-between py-12 gap-8 w-11/12 max-w-maxContent mx-auto'>
                  <div className='text-4xl font-semibold w-[45%]'>
                  Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                  </div>

                  <div className='flex flex-col gap-10 w-[40%]'>
                    <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                    <div className='w-fit'>
                    <CTAButton active={true} location={'/signup'} >
                        Learn More
                    </CTAButton>
                    </div>
                  </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Home
