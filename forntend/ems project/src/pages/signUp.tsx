import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from "lucide-react"
const SignUp = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const signUp = async (userData: SignUpProps) => {
    const response = await axios.post('http://localhost:8000/api/v1/user/register', userData);
    return response.data;
  };
  const mutation = useMutation(signUp, {
    onSuccess: (data) => {
      console.log('User signed up successfully:', data);
      alert('Sign-up successful!');
    },
    onError: (error) => {
      console.error('Sign-up failed:', error);
      alert('Sign-up failed. Please try again.');
    },
  });
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const userData: SignUpProps = { firstName, lastName, email, password };
      mutation.mutate(userData);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  };
  return (
    <div className="min-h-screen mt-14  flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</Label>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</Label>
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

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</Label>
            <Input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {
              loading ?
                <Loader2  className="w-4 h-4 animate-spin"/>
                :
                <span>
                   Sign Up
                </span>
          }

          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <span className="w-1/5 border-b"></span>
          <p className="text-sm text-gray-500">or</p>
          <span className="w-1/5 border-b"></span>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link to="/auth/sign-in" className="text-indigo-600 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp