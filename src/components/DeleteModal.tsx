import React, {FC} from 'react';
import {DeleteModalProps} from '../types/types';

const DeleteModal: FC<DeleteModalProps> = ({
  handleDelete,
  setDeleteModal,
  deleteModal,
}) => {
  return (
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
  );
};

export default DeleteModal;
