import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scrollarea"
const OrganizationList = () => {
  const getUserOrg = async()=>{
    const response = await axios.get("http://localhost:8000/api/v1/organization/user/getOrg/all",{withCredentials:true});
    return response.data;
  }
  const {data,isLoading,isError,error} = useQuery(["userOrg"],getUserOrg,{
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false, 
    staleTime: Infinity,
  })
  if(isLoading) {
    return (
      <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin"/>
      </div>
    )
  }
  if(!data && !isLoading) {
    return <div>
      <h1>No data found!</h1>
    </div>;
  }
  if(isError) {
    return (
      <div>
        <span>{error as string}</span>
      </div>
    )
  }
  if(data?.allOrg.length <=0 ) { 
    return (
      <div>
        No Organization Yet!
      </div>
    )
  }
  return (
    <div className="gap-2">
      <div>
        <h1>All Organization</h1>
      </div>
      <ScrollArea className="w-full   flex max-h-[350px] flex-col rounded-md border p-4">
        <div className="flex flex-col gap-1">
        {
        data?.allOrg?.map((org:Org,i:number)=>{
          return (   
            <Link to={`/organization/${org?.id}`}>
          <Button className="text-md w-full text-white">
            ({i+1}).
            {org.orgName}
          </Button>
          </Link>
         
)

})
      }
        </div>
      
       </ScrollArea>
    </div>
  )
}

export default OrganizationList