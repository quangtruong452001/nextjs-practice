import { set, SubmitHandler, useForm } from 'react-hook-form';
import { useAddFormContext } from './context';
import { useEffect, useState } from 'react';

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AddForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: {
      username: 'quang',
      fullname: 'quang truong',
      role: 'Dev',
      project: ['OPUS'],
      activeYn: 'Y',
    },
  });

  const { userAdded, setUserAdded } = useAddFormContext();

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      // console.log(data);
      // post data to the server
      await fetch(
        'https://nestjs-practice-production.up.railway.app/users/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      // set userAdded
      setUserAdded((prev) => !prev);
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Failed to submit form',
      });
      console.error(error);
    }
  };

  return (
    <div className='p-6 max-w-sm mx-auto bg-white border border-5 border-cyan-300 rounded-xl shadow-md flex items-center space-x-4'>
      <h1 className='text-lg antialiased'>Add User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <input
          {...register('username', { required: true })}
          type='text'
          placeholder='username'
          className='input input-bordered'
        />
        {errors.username && (
          <p className='text-red-500 text-xs'>This field is required</p>
        )}

        <input
          {...register('fullname', { required: true })}
          type='text'
          placeholder='fullname'
          className='input input-bordered'
        />
        {errors.fullname && (
          <p className='text-red-500 text-xs'>This field is required</p>
        )}

        <input
          {...register('role', { required: true })}
          type='text'
          placeholder='role'
          className='input input-bordered'
        />
        {errors.role && (
          <p className='text-red-500 text-xs'>This field is required</p>
        )}

        <input
          {...register('project', { required: true })}
          type='text'
          placeholder='project'
          className='input input-bordered'
        />
        {errors.project && (
          <p className='text-red-500 text-xs'>This field is required</p>
        )}

        <select
          {...register('activeYn', { required: true })}
          className='select select-bordered w-full'
        >
          <option value='Y'>Y</option>
          <option value='N'>N</option>
        </select>
        {errors.activeYn && (
          <p className='text-red-500 text-xs'>This field is required</p>
        )}

        <button
          type='submit'
          disabled={isSubmitting}
          className='btn btn-primary'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {errors.root && (
          <p className='text-red-500 text-xs p-5'>{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}
