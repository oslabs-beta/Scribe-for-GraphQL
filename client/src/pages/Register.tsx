import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router';
import { register as registerUser, reset } from '../features/authSlice';
import { AppDispatch } from '../app/store';

const registerFormSchema = z
  .object({
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().min(1, 'Last name required'),
    username: z.string().min(1, 'Please enter a username'),
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
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      window.alert(message);
    }

    if (user || isSuccess) {
      navigate('/test');
    }

    dispatch(reset);
  }, [isError, isSuccess, message, user, dispatch, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleRegister: SubmitHandler<registerFormSchemaType> = async (
    formData
  ) => {
    dispatch(registerUser(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <TextField
            label='First Name'
            disabled={isSubmitting}
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label='Last Name'
            disabled={isSubmitting}
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            label='Username'
            disabled={isSubmitting}
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label='Email'
            disabled={isSubmitting}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            type={hidePassword ? 'password' : 'text'}
            disabled={isSubmitting}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label='Confirm Password'
            type='password'
            disabled={isSubmitting}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type='submit' variant='contained' disabled={isSubmitting}>
            Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
