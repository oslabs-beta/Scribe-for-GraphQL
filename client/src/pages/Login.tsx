import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchemaType } from './Register';

const loginFormSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email required'),
  password: z.string().min(1, 'Please enter your password'),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

type Props = {};
const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin: SubmitHandler<loginFormSchemaType> = async (formData) => {
    try {
      console.log('login');
    } catch (err) {
      console.log('fail');
    }
  };
  return (
    <>
      <h1>login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type='text'
          {...register('usernameOrEmail')}
          disabled={isSubmitting}
        />
        <p className='error-message'>{errors.usernameOrEmail?.message}</p>
        <input
          type='password'
          {...register('password')}
          disabled={isSubmitting}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
