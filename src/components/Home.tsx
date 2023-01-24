import React, {MouseEvent, useState, FormEventHandler} from 'react';
import {useQuery} from 'react-query';
import type {User} from '../types/types';
import {Role} from '../utils/constants';
import {AiOutlineCloudDownload, AiOutlinePlus} from 'react-icons/ai';
import Table from './Table';
import Modal from './Modal';
import useApi from '../hooks/useApi';
import {CSVLink} from 'react-csv';
import Pagination from './Pagination';
import DeleteModal from './DeleteModal';

const Home = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [currentEditUser, setCurrentEditUser] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const {fetchUsers, handleUserDelete, handleUserAdd, handleUserUpdate} =
    useApi();

  const {isLoading, error, refetch} = useQuery<{}, {}, User[]>(
    'getUsers',
    () =>
      fetchUsers().then(res => {
        setUsers(res);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const handlePage = (ev: MouseEvent<HTMLElement>, ind: number) => {
    setActivePage(ind);
  };

  const handleDelete = (index: string | null) => {
    if (index) {
      handleUserDelete(index).then(() => {
        refetch();
        setDeleteModal(null);
      });
    }
  };

  const handleUserSort = (cb: any) => {
    setUsers(prev => {
      const sorted = [...prev].sort(cb);
      return sorted;
    });
  };

  const handleAdd: FormEventHandler<HTMLFormElement> = eve => {
    eve.preventDefault();
    const formData = new FormData(eve.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const avatar = formData.get('avatar') as string;
    console.log(name, email, role, currentEditUser);
    if (currentEditUser === -1) {
      handleUserAdd({
        name,
        email,
        avatar,
        role: Role[role as keyof typeof Role],
        lastLogin: new Date(),
      }).then(() => {
        refetch();
        setCurrentEditUser(null);
      });
    } else {
      handleUserUpdate({
        name,
        email,
        avatar,
        role: Role[role as keyof typeof Role],
        lastLogin: new Date(),
        id: users[(activePage - 1) * 10 + (currentEditUser as number)].id,
      }).then(() => {
        refetch();
        setCurrentEditUser(null);
      });
    }
  };

  return (
    <div className="w-full border p-5 rounded-md shadow">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-row py-1">
            <span className="pr-5 font-bold">Users</span>
            <span className="bg-green-50 text-green-500 px-3 py-1 text-sm rounded-full">
              {users?.length} users
            </span>
          </div>
          <div className="text-slate-500 text-sm ">
            Manage your team members and their account permissions here
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center space-x-3">
          <button className="h-fit border bg-white-500 p-2 rounded-md text-sm font-medium">
            <CSVLink data={users}>
              <span className="flex items-center">
                <AiOutlineCloudDownload size={20} className="mr-2" />
                Download CSV
              </span>
            </CSVLink>
          </button>
          <button
            className="h-fit border bg-white-500 p-2 rounded-md bg-blue-500 font-medium text-white text-sm"
            onClick={() => setCurrentEditUser(-1)}
          >
            <span className="flex items-center">
              <AiOutlinePlus size={20} className="mr-2" />
              Add User
            </span>
          </button>
        </div>
      </div>
      <Table
        users={(users as User[])?.slice((activePage - 1) * 10, activePage * 10)}
        loading={isLoading}
        error={error}
        currentEdit={setCurrentEditUser}
        handleUserSort={handleUserSort}
        setDeleteModal={setDeleteModal}
      />
      <Pagination
        activePage={activePage}
        handlePage={handlePage}
        users={users}
      />
      {currentEditUser !== null &&
      (currentEditUser >= 0 || currentEditUser === -1) ? (
        <Modal
          setCurrentEditUser={setCurrentEditUser}
          currentEditUser={currentEditUser}
          users={users}
          handleAdd={handleAdd}
          activePage={activePage}
        />
      ) : null}
      {deleteModal ? (
        <DeleteModal
          handleDelete={handleDelete}
          setDeleteModal={setDeleteModal}
          deleteModal={deleteModal}
        />
      ) : null}
    </div>
  );
};

export default Home;
