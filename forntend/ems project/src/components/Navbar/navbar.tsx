import Box from "../Reuseable_components/Box"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import featuredLogo from "@/assets/featured-logo.jpg"

const Navbar = ({orgName,org_img}:{orgName:string |undefined,org_img:string | undefined}) => {
  return (
    <>
    <Box className="fixed top-0 shadow-sm border-b  px-3 md:left-64 left-0 w-full md:w-[calc(100%-16rem)]">
        <div className="flex w-full gap-2 items-center">
          <span>Organization Name:</span>
          <h1 className="text-purple-600">
            {orgName}
          </h1>
        </div>
        <div className="flex w-full h-14 justify-end items-center ">
                <Avatar className="cursor-pointer">
                    <AvatarFallback>{orgName && orgName[0]}-{orgName && orgName[orgName?.length-1]}</AvatarFallback>
                    <AvatarImage src={org_img || featuredLogo}/>
                </Avatar>
        </div>
    </Box>
    </>
  )
}

export default Navbar