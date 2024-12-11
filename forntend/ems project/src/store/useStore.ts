import { Organization } from '@/types/organization';
import { create } from 'zustand';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  photo_url:JSON
}
interface StoreState {
user: User | null;
userLoading :boolean;
setUserLoading : (isLoading:boolean)=>void;
selectedOrganization: Organization | null;
setUser: (user: User) => void;
clearUser: ()=>void;
setOrganization: (organization: Organization) => void;
clearOrganization: () => void;
}

const useStore = create<StoreState>((set) => ({
  user: null,
  userLoading:false,
  setUserLoading : (loading)=>set({userLoading:loading}),
  selectedOrganization:null,
  setUser: (user) => set({ user }),
  clearUser :()=> set({user:null}),
  setOrganization: (organization) => set({ selectedOrganization: organization }),
  clearOrganization: () => set({ selectedOrganization: null }),
}));

export default useStore;

