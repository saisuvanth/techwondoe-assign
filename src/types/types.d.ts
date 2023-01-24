import {Dispatch, SetStateAction, MouseEvent, FormEventHandler} from 'react';
import {Role} from '../utils/constants';

export type User = {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  status?: 'Active' | 'Invited';
  role?: Role;
  lastLogin: Date;
};

export type UserColumn = {
  info: {name: string; avatar: string; email: string};
  lastLogin: string;
  role: Role;
  status: 'Active' | 'Invited';
  actions: ['Delete', 'Edit'];
};

export interface RespUser extends User {
  createdAt: Date;
  id: string;
}

export interface TableProps {
  users: Array<User>;
  loading: boolean;
  error: unknown;
  currentEdit: Dispatch<SetStateAction<number | null>>;
  handleUserSort: (cb: any) => void;
  setDeleteModal: Dispatch<SetStateAction<string | null>>;
}

export interface PaginationProps {
  users: Array<User>;
  activePage: number;
  handlePage: (ev: MouseEvent<HTMLElement>, ind: number) => void;
}

export interface DeleteModalProps {
  handleDelete: (index: string | null) => void;
  setDeleteModal: Dispatch<SetStateAction<string | null>>;
  deleteModal: string | null;
}

export interface ModalProps {
  activePage: number;
  setCurrentEditUser: Dispatch<SetStateAction<number | null>>;
  currentEditUser: number;
  users: User[];
  handleAdd: FormEventHandler<HTMLFormElement>;
}

export interface TableProps {
  users: User[];
  loading: boolean;
  error: unknown;
  currentEdit: Dispatch<SetStateAction<number | null>>;
  handleUserSort: (cb: any) => void;
  setDeleteModal: Dispatch<SetStateAction<string | null>>;
}
