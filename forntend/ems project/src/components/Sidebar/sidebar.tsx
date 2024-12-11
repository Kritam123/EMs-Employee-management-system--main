import { cn } from "@/lib/utils"
import Box from "../Reuseable_components/Box"
import RoutesLink from "./routesLink"
import { Link } from "react-router-dom"

const Sidebar = ({userRole}:{userRole:string}) => {
   
  return (
    <Box className="w-64 fixed top-0 flex-col left-0 shadow-sm shadow-gray-400 bg-slate-100   hidden md:flex h-full   border-r   z-50">
        <div className="px-5 flex items-center gap-3 py-3">
        <h1 className="text-xl font-bold text-purple-700 ">
          <Link to="/">
          EMS
          </Link>
        </h1>
        <span className={cn("text-sm",userRole === "ADMIN"?"text-green-700":"text-red-700")}>({userRole})</span>
        </div>
       {/* contents */}
       <div className="  mt-1 w-full">
           <RoutesLink/>
       </div>
    </Box>
  )
}

export default Sidebar