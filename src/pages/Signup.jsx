import React from 'react'
import AuthTemplate from '../component/core/auth/AuthTemplate'

const Signup = () => {

    const signupData = {
        heading : "Join the millions learning to code with StudyNotion for free",
        desc : "Build skills for today, tomorrow, and beyond.",
        subDesc : "Education to future-proof your career."
    }

  return (
    <div>
      <AuthTemplate login={false} templateData={signupData} />
    </div>
  )
}

export default Signup
