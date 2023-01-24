import React, {FC} from 'react';
import type {User, TableProps} from '../types/types';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import {getMonth, formatTime, sortTable} from '../utils';
import classNames from 'classnames';
import Spinner from './Spinner';
import {SortOrder, tableHeader} from '../utils/constants';

const Table: FC<TableProps> = ({
  users,
  loading,
  error,
  currentEdit,
  handleUserSort,
  setDeleteModal,
}) => {
  const [sort, setSort] = React.useState<SortOrder[]>([
    SortOrder.ASC,
    SortOrder.ASC,
    SortOrder.ASC,
    SortOrder.ASC,
  ]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="flex h-32 justify-content items-center">Error</div>;
  }

  const handleSort = (ind: number) => {
    const newSort = [...sort];
    newSort[ind] =
      newSort[ind] === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    setSort(newSort);
    handleUserSort((a: User, b: User) => sortTable(a, b, newSort, ind));
  };

  return (
    <div className="p-2 mt-5">
      <table className="table">
        <thead>
          <tr>
            {tableHeader.map((tble, index) => (
              <th scope="col" key={index}>
                <div className="flex justify-start">
                  {tble}
                  <button
                    className="p-1 ml-5 border-0 rounded-md shadow-sm text-gray-600 "
                    onClick={() => handleSort(index)}
                  >
                    {sort[index] === SortOrder.ASC ? (
                      <AiOutlineArrowDown />
                    ) : (
                      <AiOutlineArrowUp />
                    )}
                  </button>
                </div>
              </th>
            ))}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="mb-2">
              <td>
                <div className="flex flex-row space-x-2">
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={user.avatar}
                    alt="hehe"
                  />
                  <div className="flex flex-col flex-grow">
                    <p className="font-medium text-md">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex justify-start items-center h-full">
                  <div
                    className={classNames(
                      'rounded-full w-fit text-sm px-3 flex items-center',
                      {
                        'bg-green-100 text-green-400':
                          user?.status === 'Active',
                      },
                      {'bg-gray-100 text-gray-500': user?.status === 'Invited'}
                    )}
                  >
                    <span className="text-2xl pr-1">&#8226;</span>
                    {user?.status}
                  </div>
                </div>
              </td>
              <td>
                <div className="text-gray-500 p-1">{user?.role}</div>
              </td>
              <td>
                <div className="flex flex-col">
                  <div className="font-semibold">{`${getMonth(
                    user.lastLogin?.getMonth()
                  )} ${user.lastLogin.getDate()}, ${user.lastLogin.getFullYear()}`}</div>
                  <div className="text-slate-500 text-sm">{`${formatTime(
                    user.lastLogin
                  )}`}</div>
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-2">
                  <button className="p-1 border-2 text-slate-400 rounded-md hover:bg-red-600 hover:text-white">
                    <AiOutlineDelete
                      size={20}
                      onClick={() => setDeleteModal(user.id as string)}
                    />
                  </button>
                  <button
                    className="p-1 border-2 text-slate-400 rounded-md hover:bg-violet-500 hover:text-white"
                    onClick={() => {
                      currentEdit(index);
                    }}
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
