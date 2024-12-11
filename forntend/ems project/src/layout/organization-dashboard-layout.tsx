import Navbar from '@/components/Navbar/navbar'
import Sidebar from '@/components/Sidebar/sidebar'
import useStore from '@/store/useStore'
import { OrgMember } from '@/types/organization'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
const OrganizationDashboardLayout = () => {
  const navigate = useNavigate();
  const { user, selectedOrganization, setOrganization } = useStore();
  const { orgId } = useParams();
  const getcurrOrg = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/organization/${orgId}/`, { withCredentials: true });
    return response.data;
  }
  const { data, isLoading } = useQuery(["orgData"], getcurrOrg);
  useEffect(() => {
    if (data?.org) {
      setOrganization(data?.org)
    }
  }, [data?.org, setOrganization])
  // @ts-expect-error due to any
  const currentMember = selectedOrganization?.orgMembers?.find((item: OrgMember) => item.employeeId === user?.id)
  const userRole =currentMember?currentMember?.role : "EMPLOYEE"
  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/", { replace: true })
    }
  }, [isLoading, data, navigate])
  if (isLoading && !selectedOrganization) {
    return (
      <div className='flex items-center justify-center min-h-screen w-full'>
        <Loader2 className='w-16 h-16 text-purple-700 animate-spin' />
      </div>
    )
  }
  return (
    <>
      <Sidebar userRole={userRole} />
         
      <Navbar orgName={selectedOrganization?.orgName}  org_img={selectedOrganization && JSON.parse(selectedOrganization?.org_logo)?.secure_url} />
      {
        data ? <Outlet /> : <Navigate to={"/"} />
      }
    </>
  )
}

export default OrganizationDashboardLayout