import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerFormSchema = z
  .object({
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().min(1, 'Last name required'),
    email: z
      .string()
      .min(1, 'Email required')
      .email('Please enter a valid email'),
    password: z.string().min(1, 'Password required'),
    confirmPassword: z.string().min(1, 'Please confirm password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type registerFormSchemaType = z.infer<typeof registerFormSchema>;

// type Props = {};
const Register = (props: {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleRegister: SubmitHandler<registerFormSchemaType> = async (
    userInput
  ) => {
    try {
      // invoke registerUser. if successful, redirect to home
      console.log('hi');
    } catch (err) {
      //grab error from
      console.log('bye');
    }
  };
  return (
    <>
      <div className=''>Register</div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <input
          type='text'
          placeholder='First Name'
          disabled={isSubmitting}
          {...register('firstName')}
        />
        <p className='error-message'>{errors.firstName?.message}</p>
      </form>
    </>
  );
};

export default Register;
