// hooks/useUserData.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API call to get user data
const fetchUserData = async () => {
  const response = await axios.get("http://localhost:8000/api/v1/user/me", {
    withCredentials: true,
  });
  return response.data;
};

// Custom hook to fetch and cache user data
export const useUserData = () => {
  return useQuery(["userData"], fetchUserData, {
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Avoid refetching when tab regains focus
  });
};
