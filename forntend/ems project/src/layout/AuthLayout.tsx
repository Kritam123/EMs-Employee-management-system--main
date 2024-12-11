import AuthNavbar from '@/components/Navbar/AuthNavbar'
import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' '>
        <AuthNavbar/>
        {children}
    </div>
  )
}

export default AuthLayout