import React, {Fragment} from 'react';
import {FC} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {ModalProps} from '../types/types';

const Modal: FC<ModalProps> = ({
  setCurrentEditUser,
  currentEditUser,
  users,
  handleAdd,
  activePage,
}) => {
  return (
    <Fragment>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 w-2/4">
          <div className="bg-white p-3 rounded-md">
            <div className="flex justify-between mb-2 pb-2 border-b">
              <div className="text-lg font-semibold">Add User</div>
              <button
                className="p-1 border-2 rounded-md"
                onClick={() => setCurrentEditUser(null)}
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex flex-col">
              <form className="flex flex-col" onSubmit={handleAdd}>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={
                    currentEditUser !== -1
                      ? users[(activePage - 1) * 10 + currentEditUser].name
                      : ''
                  }
                />
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={
                    currentEditUser !== -1
                      ? users[(activePage - 1) * 10 + currentEditUser].email
                      : ''
                  }
                />
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="role"
                >
                  Role
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  name="role"
                  id="role"
                  defaultValue={
                    currentEditUser !== -1
                      ? users[(activePage - 1) * 10 + currentEditUser].role
                      : ''
                  }
                />
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="avatar"
                >
                  Avatar
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="text"
                  name="avatar"
                  id="avatar"
                  defaultValue={
                    currentEditUser !== -1
                      ? users[(activePage - 1) * 10 + currentEditUser].avatar
                      : ''
                  }
                />
                <div className="flex justify-center px-5">
                  <button
                    type="submit"
                    className="rounded-lg p-2 w-1/2 bg-blue-600 mt-4"
                  >
                    {currentEditUser === -1 ? 'Add' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Fragment>
  );
};

export default Modal;
