import EditForm from './EditForm';
import { useState } from 'react';

export default function Table({
  columns,
  data,
  searchParams,
  handleSearchInputChange,
  handleDelete,
}: {
  columns: string[];
  data: User[];
  searchParams: UserInput;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: (username: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  async function onClickDeleteButton(username: string): Promise<void> {
    await handleDelete(username);
  }

  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra w-full'>
        {/* head */}
        <thead className='text-base'>
          <tr>
            {columns.map((column) => (
              // <th key={column}>{column}</th>
              <th key={column}>
                <input
                  type='text'
                  name={column}
                  placeholder={`Search by ${column}`}
                  value={searchParams[column]}
                  onChange={(e) => handleSearchInputChange(e)}
                />
              </th>
            ))}
          </tr>
        </thead>
        {/* body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column}>
                  {column === 'project'
                    ? String(row[column as keyof typeof row])
                    : row[column as keyof typeof row]}
                </td>
              ))}
              <td>
                <button
                  className='btn w-32 h-12 btn-accent '
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedUser(row);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className='btn w-32 h-12 btn-error'
                  onClick={() => onClickDeleteButton(row.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
            </span>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <EditForm
                  row={selectedUser}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
