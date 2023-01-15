import React, {MouseEvent, useState, FormEventHandler} from 'react';
import {useQuery} from 'react-query';
import {User, Role} from '../types';
import {AiOutlineCloudDownload, AiOutlinePlus} from 'react-icons/ai';
import Table from './Table';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import Modal from './Modal';
import useApi from '../hooks/useApi';
import {CSVLink} from 'react-csv';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
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

  const handleDelete = (index: string) => {
    handleUserDelete(index).then(() => {
      refetch();
      setDeleteModal(null);
    });
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
    <div className="container border p-5 rounded-md shadow">
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
      <div className="flex flex-row justify-between">
        <button
          className="flex items-center border bg-white-500 p-2 rounded-md text-sm font-medium disabled:opacity-50"
          onClick={ev => handlePage(ev, activePage - 1)}
          disabled={activePage === 1}
        >
          <AiOutlineArrowLeft />
          <div className="pl-2">Previous</div>
        </button>
        <div className="flex">
          {users &&
            [
              ...Array(
                Math.trunc((users?.length as number) / 10) +
                  (users?.length % 10 !== 0 ? 1 : 0)
              ).keys(),
            ].map(num => (
              <button
                key={num}
                className={
                  'mx-1 px-3 border items-center flex rounded-md ' +
                  (activePage === num + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white-500 text-slate-500')
                }
                onClick={ev => handlePage(ev, num + 1)}
              >
                {num + 1}
              </button>
            ))}
        </div>
        <button
          className="flex items-center border bg-white-500 p-2 rounded-md text-sm font-medium disabled:opacity-50"
          onClick={ev => handlePage(ev, activePage + 1)}
          disabled={
            activePage - 1 >= Math.trunc((users?.length as number) / 10)
          }
        >
          <div className="pr-2">Next</div>
          <AiOutlineArrowRight />
        </button>
      </div>
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
        <div>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg z-20">
            <div className="p-4">
              <div className="text-lg font-bold">Delete User</div>
              <div className="text-sm text-slate-500">
                Are you sure you want to delete this user?
                <div className="flex flex-row-reverse mt-4 justify-between">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDelete(deleteModal)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-white-500 text-slate-500 px-3 py-1 rounded-md"
                    onClick={() => setDeleteModal(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
