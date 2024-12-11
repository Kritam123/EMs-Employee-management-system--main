import React from 'react'
interface ViewPageComponentsProps {
    children:React.ReactNode,

}
const ViewPageComponents = ({children}:ViewPageComponentsProps) => {
  return (
    <div className='ml-64 mt-14'>{children}</div>
  )
}

export default ViewPageComponents