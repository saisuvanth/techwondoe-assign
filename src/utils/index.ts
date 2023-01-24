import {User} from '../types/types';

export const getMonth = (month: number) => {
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

export const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime =
    hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
  return strTime;
};

export const sortTable = (
  a: User,
  b: User,
  newSort: Array<string>,
  ind: number
) => {
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
};
