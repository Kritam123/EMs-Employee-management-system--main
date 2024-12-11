import Box from '../Reuseable_components/Box'
import { Button } from '../ui/button'
import {useLocation, useNavigate, useParams} from "react-router-dom"
import {LucideLayoutDashboard,BadgeDollarSign,CalendarCheck,CalendarDays,ReceiptText,MessageCircleMore} from "lucide-react"
import { cn } from '@/lib/utils'


const RoutesLink = () => {
    const {orgId} = useParams();
    const  employeeLinks = [
        {
            href:`/organization/${orgId}/dashboard` ,
            label:"Dashboard",
            icon:LucideLayoutDashboard
        },
        {   
            href:`/organization/${orgId}/schedule`,
            label:"Schedule",
            icon:CalendarCheck
        },
        {
            href:`/organization/${orgId}/calender`,
            label:"Calendar",icon:CalendarDays
    
        },{
            href:`/organization/${orgId}/salaries`,
            label:"Salaries",
            icon:BadgeDollarSign
        },
        {
            href:`/organization/${orgId}/messages`,
            label:"Messages",
            icon:MessageCircleMore
        },
        {
            href:`/organization/${orgId}/contract`,
            label:"Contract Remainder",
            icon:ReceiptText
        }
    ]
    const {pathname} = useLocation();
    const navigate=useNavigate() 
    const handleRoute = (href:string)=>{
            navigate(href,{replace:true});
    }
  return (
    <Box className='flex-col  gap-5'>
        {
            employeeLinks.map(({href,icon:Icon,label},i)=>{
                return(
                    
                    <Button key={i} className={cn('w-full rounded-none flex justify-start  gap-5 before:hidden before:absolute relative  before:content-[""] before:w-2  before:h-full before:bg-purple-700 before:right-0  bg-gray-200 py-6 hover:bg-purple-500 hover:text-white',pathname === href && "before:block bg-purple-500 text-white")} onClick={()=>handleRoute(href)} variant={"ghost"}>
                        <Icon/>
                        <span >{label}</span>
                    </Button>

                )
            })
        }
    </Box>
  )
}

export default RoutesLink