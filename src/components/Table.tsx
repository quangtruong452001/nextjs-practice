import {
  CellContext,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import EditForm from './EditForm';
import { useMemo, useState } from 'react';

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
  // State to manage modal visibility and the selected user for editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const tableColumns = useMemo(() => {
    return columns.map((column) => ({
      header: column,
      accessorKey: column,
      cell: (props: CellContext<User, any>) => {
        const row = props.row.original;
        if (column === 'project') {
          return String(row[column as keyof typeof row]);
        }
        return row[column as keyof typeof row];
      },
    }));
  }, [columns]);

  const table = useReactTable({
    columns: tableColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  // Function to handle delete button click
  async function onClickDeleteButton(username: string): Promise<void> {
    await handleDelete(username);
  }

  return (
    <div className='overflow-x-auto'>
      <table className='table table-zebra w-full'>
        {/* head */}
        <thead className='text-base'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th key={column.id}>
                  <input
                    type='text'
                    name={column.id}
                    placeholder={`Search by ${column.id}`}
                    value={searchParams[column.id]}
                    onChange={(e) => handleSearchInputChange(e)}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* body */}

        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <button
                  className='btn w-32 h-12 btn-accent '
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedUser(row.original);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className='btn w-32 h-12 btn-error'
                  onClick={() => onClickDeleteButton(row.original.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for EditForm */}
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
            ></span>
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
