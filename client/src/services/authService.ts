import { loginFormSchemaType } from '../pages/Login';
import { registerFormSchemaType } from '../pages/Register';

export const registerUser = (userData: registerFormSchemaType) => {
  console.log(
    'this will be an axios request to our backend. Destructure the data and return it'
  );
};

export const loginUser = (userData: loginFormSchemaType) => {
  console.log(
    'this will be axios request to backend, destructure data and return it'
  );
};
