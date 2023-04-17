import { loginFormSchemaType } from '../pages/Signin';
import { registerFormSchemaType } from '../pages/Signin';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { User } from '../features/authSlice';

export const registerUser = async (userData: registerFormSchemaType) => {
  const { data } = await axios.post(API_URL + 'auth/register', userData, {
    withCredentials: true,
  });

  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
};

export const loginUser = async (
  userData: loginFormSchemaType
): Promise<User> => {
  const { data } = await axios.post(API_URL + 'auth/login', userData, {
    withCredentials: true,
  });
  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};

export const logoutUser = async (): Promise<boolean> => {
  const { data } = await axios.post(API_URL + 'auth/logout', null, {
    withCredentials: true,
  });
  return data;
};
