import { loginFormSchemaType } from '../pages/Signin';
import { registerFormSchemaType } from '../pages/Signin';
import axios from 'axios';
import { API_URL } from '../utils/constants';

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
): Promise<any> => {
  const { data } = await axios.post(API_URL + 'auth/login', userData, {
    withCredentials: true,
  });
  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};
