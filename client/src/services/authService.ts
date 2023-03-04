import { loginFormSchemaType } from '../pages/Login';
import { registerFormSchemaType } from '../pages/Register';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export const registerUser = (userData: registerFormSchemaType) => {
  console.log(
    'this will be an axios request to our backend. Destructure the data and return it'
  );
};

export const loginUser = async(userData: loginFormSchemaType) => {
  const {data} = await axios.post(API_URL + 'login', userData, {withCredentials:true})
  if(data) {
    localStorage.setItem('user', JSON.stringify(data))
  }
  return data;
};
