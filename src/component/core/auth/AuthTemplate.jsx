import React from 'react'
import LoginFrom from './LoginFrom'
import SignupForm from './SignupForm'
import frame from "../../../assets/Images/frame.png"
import loginImg from "../../../assets/Images/login.webp"
import signupImg from "../../../assets/Images/signup.webp"

const AuthTemplate = ({ templateData, login }) => {
    return (
        <div className='flex w-11/12 min-h-[calc(100vh-3.5rem)] max-w-maxContent mx-auto items-center  justify-betmx-auto  flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12ween'>
            <div className='w-full h-full mx-auto max-w-[450px]  '>

                <h1 className="text-[1.875rem] text-white font-semibold leading-[2.375rem]">{templateData.heading}</h1>

                <p className="mt-4 flex flex-col text-[1.125rem] leading-[1.625rem]">
                    <span className="text-richblack-100">{templateData.desc}</span>{" "}
                    <span className="font-edu-sa font-bold italic text-blue-100">
                        {templateData.subDesc}
                    </span>
                </p>
                {
                    login ? <LoginFrom /> : <SignupForm />
                }
            </div>

            <div className='relative mx-auto w-11/12 max-w-[450px]'>
                <img
                    src={frame}
                    alt="Pattern"
                    width={558}
                    height={504}
                    loading="lazy"
                />

                <img
                    src={login ? loginImg : signupImg}
                    alt="Students"
                    width={558}
                    height={504}
                    loading="lazy"
                    className="absolute -top-4 right-4 z-10"
                />
            </div>
        </div>
    )
}

export default AuthTemplate
