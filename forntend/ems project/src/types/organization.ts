import { User } from './user';
type OrgMemberResponse = {
  id: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  employeeId: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    PhoneNo?: string | null;
    photo_url?: JSON; // JSON type
    address?: string | null;
  };
};
export interface Organization {
  id: string;
  orgName: string;
  description?: string;
  org_logo?: string;
  employees: User[];
  employeeIds: string[];
  orgMembers: OrgMemberResponse[];
  orgMemberAttendance: string[];
  createdId: string;
  Creater?: User;
  memberInviteCode: string;
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrgMemberSalary {
  id: string;
  grossSalary?: number;
  deductionsOfSalary?: number;
  reasonOfDeduction?: string;
  orgMemberId: string;
  createdAt: Date;
  updateAt: Date;
}
export interface OrgMemberAttendance {
  id: string;
  isPresent: boolean;
  orgMemberId: string;
  organizationId: string;
}

export interface OrgMember {
  id: string;
  employeeId: string;
  employee: User;
  organizationId: string;
  organization: Organization;
  orgMemberSalary: OrgMemberSalary[];
  orgMemberAttendance: OrgMemberAttendance[];
  createdAt: Date;
  role: Role;
  updatedAt: Date;
}

export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}