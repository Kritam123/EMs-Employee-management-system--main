// Login.jsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import queryClient from "@/hooks/useQuery";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(false)
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) =>
      axios.post('http://localhost:8000/api/v1/user/login', { email, password }, {
        withCredentials: true, // Allow cookies to be set
      }),
    onSuccess: (data) => {
      console.log('Login successful:', data);
      queryClient.invalidateQueries(["userData"]);
      alert('You are logged in!');
      setLoading(false);
      navigate("/", { replace: true })
      // Perform additional tasks like fetching user data here
    },
    onError: (error) => {
      console.error('Login failed:', error);
      alert('Invalid credentials!');
      setLoading(false);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    setLoading(true);
    e.preventDefault();
    mutation.mutate({ email, password }); // Trigger the API call
  };
  return (
    <div className="h-[calc(100vh-1rem)]  flex mt-3 items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Login to EMS</h2>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link to="/auth/forget" className="text-sm text-indigo-600 hover:underline">
              Forgot your password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {
              loading ?
                <Loader2 className="w-4 h-4 animate-spin" />
                :
                <span>
                  Sign In
                </span>
            }
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-between">
          <span className="w-1/5 border-b"></span>
          <p className="text-sm text-gray-500">or</p>
          <span className="w-1/5 border-b"></span>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/auth/sign-up" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
