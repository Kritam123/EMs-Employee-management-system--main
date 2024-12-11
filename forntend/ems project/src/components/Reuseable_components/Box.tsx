import { cn } from '@/lib/utils'
import React from 'react'

const Box = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <div className={cn("flex flex-row w-full",className)}>
        {children}
    </div>
  )
}

export default Box