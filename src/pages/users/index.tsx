import AddForm from '@/components/AddForm';
import {
  AddFormContext,
  useAddFormContext,
  useEditFormContext,
} from '@/components/context';
import Table from '@/components/Table';
import { useEffect, useState } from 'react';

export default function UserPage() {
  const { userAdded } = useAddFormContext();
  const { userUpdated } = useEditFormContext();

  const [users, setUsers] = useState<User[]>([]);
  const [columnKeys, setColumnKeys] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useState({
    username: '',
    fullname: '',
    role: '',
    project: '',
    activeYn: '',
  });

  const toggleAddForm = () => {
    setShowAddForm((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const query = new URLSearchParams(
          Object.entries(searchParams).filter(([, value]) => value !== '')
        ).toString();

        const data = await fetch(
          `https://nestjs-practice-production.up.railway.app/users/search?${query}`
        );
        let users = await data.json().then((res) => res.data);

        // if users is not an array, convert it to an array
        if (!Array.isArray(users)) {
          users = [users];
        }

        if (users.length > 0) {
          setColumnKeys(Object.keys(users[0]));
        }

        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [searchParams, userAdded, isDeleted, userUpdated]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (username: string) => {
    try {
      // query parameter username = username
      await fetch(
        `https://nestjs-practice-production.up.railway.app/users/delete?username=${username}`,
        {
          method: 'DELETE',
        }
      );

      setIsDeleted((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='text-center text-red-400 text-2xl mt-8'>
        User management table
      </div>

      <div className='mt-12'>
        <Table
          columns={columnKeys}
          data={users}
          searchParams={searchParams}
          handleSearchInputChange={handleSearchInputChange}
          handleDelete={handleDelete}
        />
      </div>

      <div className='col-span-1 flex  p-4'>
        <button
          className='btn w-32 h-12 btn-outline btn-success'
          onClick={toggleAddForm}
        >
          Add user
        </button>
      </div>

      {showAddForm && (
        <div>
          <AddForm />
        </div>
      )}
    </>
  );
}
