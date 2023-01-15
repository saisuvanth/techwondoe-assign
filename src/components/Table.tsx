import React, {FC, SetStateAction} from 'react';
import {User} from '../types';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import {Dispatch} from 'react';
import classNames from 'classnames';

const getMonth = (month: number) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[month];
};

const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime =
    hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
  return strTime;
};

interface TableProps {
  users: User[];
  loading: boolean;
  error: unknown;
  currentEdit: Dispatch<SetStateAction<number | null>>;
  handleUserSort: (cb: any) => void;
  setDeleteModal: Dispatch<SetStateAction<string | null>>;
}

const Table: FC<TableProps> = ({
  users,
  loading,
  error,
  currentEdit,
  handleUserSort,
  setDeleteModal,
}) => {
  const [sort, setSort] = React.useState<string[]>([
    'asc',
    'asc',
    'asc',
    'asc',
  ]);
  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handleSort = (ind: number) => {
    const newSort = [...sort];
    console.log(ind);
    newSort[ind] = newSort[ind] === 'asc' ? 'desc' : 'asc';
    setSort(newSort);
    handleUserSort((a: User, b: User) => {
      if (newSort[ind] === 'asc') {
        if (ind === 0) {
          return a.name.localeCompare(b.name);
        }
        if (ind === 1) {
          return a.status?.localeCompare(b.status as string);
        }
        if (ind === 2) {
          return a.role?.localeCompare(b.role?.toString() as string);
        }
        if (ind === 3) {
          return a.lastLogin.getTime() - b.lastLogin.getTime();
        }
      } else {
        if (ind === 0) {
          return b.name.localeCompare(a.name);
        }
        if (ind === 1) {
          return b.status?.localeCompare(a.status as string);
        }
        if (ind === 2) {
          return b.role?.localeCompare(a.role?.toString() as string);
        }
        if (ind === 3) {
          return b.lastLogin.getTime() - a.lastLogin.getTime();
        }
      }
      return 0;
    });
  };

  return (
    <div className="p-2 mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <div className="flex justify-between">
                Name
                <button
                  className="p-1 border rounded-lg"
                  onClick={() => handleSort(0)}
                >
                  {sort[0] === 'asc' ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </button>
              </div>
            </th>
            <th scope="col">
              <div className="flex justify-between">
                Status
                <button
                  className="p-1 border rounded-lg"
                  onClick={() => handleSort(1)}
                >
                  {sort[1] === 'asc' ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </button>
              </div>
            </th>
            <th scope="col">
              <div className="flex justify-between">
                Role
                <button
                  className="p-1 border rounded-lg"
                  onClick={() => handleSort(2)}
                >
                  {sort[2] === 'asc' ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </button>
              </div>
            </th>
            <th scope="col">
              <div className="flex justify-between">
                Last Login
                <button
                  className="p-1 border rounded-lg"
                  onClick={() => handleSort(3)}
                >
                  {sort[3] === 'asc' ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </button>
              </div>
            </th>
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
