export enum Role {
  Admin = 'Admin',
  SalesLeader = 'Sales Leader',
  SalesRep = 'Sales Rep',
}

export type User = {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  status?: 'Active' | 'Invited';
  role?: Role;
  lastLogin: Date;
};

export interface RespUser extends User {
  createdAt: Date;
  id: string;
}
