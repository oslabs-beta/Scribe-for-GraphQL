import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { registerFormSchemaType } from './Register';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { login, reset } from '../features/authSlice';
import Swal from 'sweetalert2';

const loginFormSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email required'),
  password: z.string().min(1, 'Please enter your password'),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

type Props = {};
const Login = (props: Props) => {

  const {user, isLoading, isError, isSuccess, message} = useSelector((state:RootState) => state.auth)

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
   if (user) navigate('/test')
  },[user])

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

    console.log('CLICKED LOGIN')
    const data = dispatch(login(formData))

    //useEffect not working correctly with modal
    if ((await data).payload === 'invalid login credentials') {

      const errMessage = (await data).payload;
      
      const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'error',
              title: errMessage
            })
    } else  {navigate('/test')}

    dispatch(reset());
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