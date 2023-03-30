import { useEffect, useState } from 'react';
import * as Components from '../styles/SliderStyle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState, AppDispatch } from '../app/store';
import { login, register, reset } from '../features/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { registerUser } from '../services/authService';

const loginFormSchema = z.object({
  email: z.string().min(1, 'email required'),
  password: z.string().min(1, 'Please enter your password'),
});
export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

const registerFormSchema = z
  .object({
    name: z.string().min(1, 'name required'),
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

const signinAndRegister = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
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

  const [signIn, toggle] = useState<boolean>(true);
  const [hidePassword, setHidePassword] = useState(true);

  const {
    register: registerRegister,
    handleSubmit: registerSubmit,
    formState: { errors: registerErrors, isSubmitting: registerSubmitting },
  } = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
  });

  const {
    register: loginRegister,
    handleSubmit: loginSubmit,
    formState: { errors: loginErrors, isSubmitting: loginSubmitting },
  } = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleRegister: SubmitHandler<registerFormSchemaType> = async (
    formData
  ) => {
    const data = dispatch(register(formData));

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
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      //@ts-ignore
      Toast.fire({
        icon: 'error',
        title: errMessage,
      });
    } else {
      navigate('/test');
    }

    dispatch(reset());
  };

  const handleLogin: SubmitHandler<loginFormSchemaType> = async (
    formData: loginFormSchemaType
  ) => {
    console.log('CLICKED LOGIN');
    const data = dispatch(login(formData));

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
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      //@ts-ignore
      Toast.fire({
        icon: 'error',
        title: errMessage,
      });
    } else {
      navigate('/test');
    }

    dispatch(reset());
  };

  return (
    <div id='signinBackground'>
      <div id='sliderContainer'>
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form onSubmit={registerSubmit(handleRegister)}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type='text'
                placeholder='Full Name'
                {...registerRegister('name')}
                disabled={registerSubmitting}
              />
              <p>{registerErrors.name?.message}</p>
              <Components.Input
                type='email'
                placeholder='Email'
                {...registerRegister('email')}
                disabled={registerSubmitting}
              />
              <p>{registerErrors.email?.message}</p>
              <Components.Input
                type='password'
                placeholder='Password'
                {...registerRegister('password')}
                disabled={registerSubmitting}
              />
              <p>{registerErrors.password?.message}</p>
              <Components.Input
                type='password'
                placeholder='Confirm Password'
                {...registerRegister('confirmPassword')}
                disabled={registerSubmitting}
              />
              <p>{registerErrors.confirmPassword?.message}</p>
              <Components.Button type='submit'>Sign Up</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form onSubmit={loginSubmit(handleLogin)}>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                type='email'
                placeholder='Email'
                {...loginRegister('email')}
                disabled={loginSubmitting}
              />
              <p>{loginErrors.email?.message}</p>
              <Components.Input
                type='password'
                placeholder='password'
                {...loginRegister('password')}
                disabled={loginSubmitting}
              />
              <p>{loginErrors.password?.message}</p>
              <Components.Anchor href='#'>
                Forgot your password?
              </Components.Anchor>
              <Components.Button type='submit'>Sign In</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  Have an account already? Sign in to continue!
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Create an account and start generating tests!
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
    </div>
  );
};

export default signinAndRegister;
