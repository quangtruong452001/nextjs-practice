import { SubmitHandler, useForm } from 'react-hook-form';
import { useEditFormContext } from './context';

interface EditFormProps {
  row: User;
  onClose: () => void;
}

export default function EditForm({ row, onClose }: EditFormProps) {
  const { userUpdated ,setUserUpdated } = useEditFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: row,
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      // Update the user data on the server
      const new1  = await fetch(
        `https://nestjs-practice-production.up.railway.app/users/update?username=${row.username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      console.log(new1);

      // if the user is updated, set userUpdated to true
      setUserUpdated((prev) => !prev);

      // Close the form
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-6 max-w-sm mx-auto bg-white border border-5 border-cyan-300 rounded-xl shadow-md flex items-center space-x-4'>
      <h1 className='text-lg antialiased'>Edit User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <input
          {...register('username', { required: true })}
          type='text'
          placeholder='username'
          className='input input-bordered'
        />

        <input
          {...register('fullname', { required: true })}
          type='text'
          placeholder='fullname'
          className='input input-bordered'
        />

        <input
          {...register('role', { required: true })}
          type='text'
          placeholder='role'
          className='input input-bordered'
        />

        <input
          {...register('project', { required: true })}
          type='text'
          placeholder='project'
          className='input input-bordered'
        />

        <select
          {...register('activeYn', { required: true })}
          className='select select-bordered w-full'
        >
          <option value='Y'>Y</option>
          <option value='N'>N</option>
        </select>

        <div className='flex justify-between'>
          <button
            type='submit'
            className={`btn w-32 h-12 btn-accent ${
              isSubmitting ? 'loading' : ''
            }`}
          >
            Submit
          </button>
          <button
            type='button'
            onClick={onClose}
            className='btn w-32 h-12 btn-accent'
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
