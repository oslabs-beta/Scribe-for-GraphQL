import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { registerFormSchemaType } from './Register';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login, reset } from '../features/authSlice';

const loginFormSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email required'),
  password: z.string().min(1, 'Please enter your password'),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

type Props = {};
const Login = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin: SubmitHandler<loginFormSchemaType> = async (
    formData: loginFormSchemaType
  ) => {
    dispatch(login(formData));
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(handleLogin)}
          sx={{ mt: 3 }}
        >
          <TextField
            margin='normal'
            fullWidth
            label='Username or Email'
            {...register('usernameOrEmail')}
            disabled={isSubmitting}
            error={!!errors.usernameOrEmail}
            helperText={errors.usernameOrEmail?.message}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            {...register('password')}
            disabled={isSubmitting}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
