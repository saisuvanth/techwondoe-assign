import React, {FC} from 'react';
import {PaginationProps} from '../types/types';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';

const Pagination: FC<PaginationProps> = ({users, handlePage, activePage}) => {
  return (
    <div className="flex flex-row justify-between">
      <button
        className="page_button"
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
        className="page_button"
        onClick={ev => handlePage(ev, activePage + 1)}
        disabled={activePage - 1 >= Math.trunc((users?.length as number) / 10)}
      >
        <div className="pr-2">Next</div>
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
