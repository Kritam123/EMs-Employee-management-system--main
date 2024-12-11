// CreateOrganization.jsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import queryClient from '@/hooks/useQuery';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CreateOrganization = () => {
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const createOrg = async (orgData: CreateOrganization) => {
    const response = await axios.post('http://localhost:8000/api/v1/organization/create', orgData,{withCredentials:true});
    return response.data;
  };
  const mutation = useMutation(createOrg, {
    onSettled: () => {
      queryClient.invalidateQueries(["userOrg"]);
    },
    onSuccess: (data) => {
      console.log('Create Organization successfully:', data);
      alert("Org Created!")
      navigate(`/organization/${data?.data?.createOrg?.id}/`,{replace:true})
    },
    onError: (error) => {
      console.error('Sign-up failed:', error);
      alert('Create Org failed. Please try again.');
    },
  });
  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    try {
      setLoading(true)
      e.preventDefault()
      const orgData: CreateOrganization = { orgName: organizationName };
      mutation.mutate(orgData);
      setOrganizationName('');
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className='w-full'>
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Create Organization</h2>
      {/* Create Organization Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Name Input */}
        <div>
          <Label
            htmlFor="organizationName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Organization Name
          </Label>
          <Input
            type="text"
            id="organizationName"
            name="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter organization name"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {
            loading ?
              <Loader2 className="w-4 h-4 animate-spin" />
              :
              <span>
                Create Organization
              </span>
          }

        </Button>
      </form>
    </div>
  );
};

export default CreateOrganization;
