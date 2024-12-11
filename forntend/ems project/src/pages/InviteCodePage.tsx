import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useFetchCurrentUser";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const InviteCodePage = () => {
  const navigate = useNavigate();
  const { InviteCode } = useParams();
  const [message, setMessage] = useState<string | null>(null);

  // Query to get user data
  const {data,isLoading} = useUserData();

  // API call function to accept invite
  const updateEmployee = async (code: string) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/organization/memberInviteCode/${code}`,
      { withCredentials: true }
    );
    return response.data;
  };

  // useMutation hook for accepting the invite
  const acceptMutation = useMutation(() => updateEmployee(InviteCode!), {
    onSuccess: (data) => {
      setMessage("Invite accepted! Redirecting...");
      setTimeout(() => navigate(`/organization/${data?.data?.org?.id}`), 2000);
    },
    onError: (error: any) => {
      setMessage(
        `Error accepting invite: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  // Handle side effects (like redirects) inside useEffect
  useEffect(() => {
    if (!isLoading && !data?.data?.user) {
      navigate("/auth/sign-in", { replace: true });
    }

    if (!InviteCode) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data, InviteCode, navigate]);

  const handleAccept = () => acceptMutation.mutate();
  const handleDecline = () => {
    setMessage("Invite declined.");
    setTimeout(() => navigate("/"), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader2 className="w-16 h-16 text-purple-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Invitation
        </h2>

        {message ? (
          <p className="text-center text-gray-700 mb-4">{message}</p>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-8">
              You have been invited. Do you want to accept the invite?
            </p>

            <div className="flex space-x-4 justify-center">
              <Button
                onClick={handleAccept}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Accept Invite
              </Button>

              <Button
                onClick={handleDecline}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Decline
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InviteCodePage;
