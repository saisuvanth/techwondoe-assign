import {RespUser, User} from '../types/types';
import {Role} from '../utils/constants';

const roleArr: Role[] = [Role.Admin, Role.SalesLeader, Role.SalesRep];

const arrRandom = (arr: any) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const useApi = () => {
  const headers = {
    'app-id': '63c344bafedff169f5d45272',
    'Content-Type': 'application/json',
  };

  const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`${process.env.REACT_APP_API}/users`, {
      method: 'GET',
      headers: headers,
    });
    const json = await res.json();
    const data: User[] = json.map((us: RespUser) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {createdAt, ...user} = us;
      user.role = arrRandom(roleArr);
      user.status = arrRandom(['Active', 'Invited']);
      user.lastLogin = new Date(user.lastLogin);
      return user;
    });
    return data;
  };

  const handleUserDelete = async (userId: string) => {
    console.log(userId);
    const res = await fetch(`${process.env.REACT_APP_API}/users/${userId}`, {
      method: 'DELETE',
      headers: headers,
    });
    await res.json();
  };

  const handleUserAdd = async (user: User) => {
    const res = await fetch(`${process.env.REACT_APP_API}/users`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user),
    });
    await res.json();
  };

  const handleUserUpdate = async (user: User) => {
    const res = await fetch(`${process.env.REACT_APP_API}/users/${user.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(user),
    });
    await res.json();
  };

  return {fetchUsers, handleUserDelete, handleUserAdd, handleUserUpdate};
};

export default useApi;
