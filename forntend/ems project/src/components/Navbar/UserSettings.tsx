import { Loader2, LogOut, Settings } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import UserSettingsModal from "../CustomModels/user-setting-model";
import axios from "axios";
import queryClient from "@/hooks/useQuery";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useStore from "@/store/useStore";
const UserSettings = () => {
  const navigate = useNavigate();
  const {clearUser} = useStore()
  const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
    const logoutUser = async () => {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/logout", 
        {}, 
        { withCredentials: true }
      );
      return response.data;
    };
    const logOutMutate = useMutation(logoutUser, {
      onSuccess: () => {
        queryClient.clear();
        clearUser();
        alert("LogOut Success")
        // Redirect to login page after logout
        queryClient.invalidateQueries(["userData"]);
        navigate("/auth/sign-in");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
        alert("An error occurred while logging out. Please try again.");
      },
    });
  const handleLogout = () => {
    logOutMutate.mutate();
  }
  
  return (
    <>
      <UserSettingsModal setOpen={setOpen} open={open} />
      <div className="space-y-2">
        <Button
        onClick={()=>setOpen(true)}
          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Button>

        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-gray-100"
        >
          {logOutMutate.isLoading ?<Loader2 className="w-4 h-4 text-purple-700 animate-spin"/> : 
          <>
          <LogOut className="w-4 h-4 text-red-500" />
          <span className="text-red-500">Logout</span>
          </>
          }
        </Button>
      </div>
    </>
  )
}

export default UserSettings