import React from 'react'
import AuthTemplate from '../component/core/auth/AuthTemplate'

const Login = () => {
    const loginData = {
        heading : 'Welcome Back',
        desc : "Build skills for today, tomorrow, and beyond.",
        subDesc : "Education to future-proof your career."
    }

  return (
    <div>
      <AuthTemplate login={true} templateData={loginData}/>
    </div>
  )
}

export default Login
