export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    photo_url?:JSON;
    PhoneNo?: string;
    address?: string;
    createdOrg: string[]; // Organization IDs
    organizations: string[];
    organizationIds: string[];
    createdAt: Date;
    updatedAt: Date;
    orgMembers: string[]; // OrgMember IDs
    refreshToken?: string;
  }