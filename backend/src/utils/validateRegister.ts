export const validateRegister = (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): { errorMessage: null | string } => {
  let errorMessage = null;

  switch (true) {
    case !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword:
      errorMessage = 'please enter all required fields!';
      break;

    //set more specific username rules here
    case username.includes('@'):
      errorMessage = 'username cannot include @symbol';
      break;

    case !email.includes('@'):
      errorMessage = 'please enter valid an email';
      break;

    case password.length <= 8:
      errorMessage = 'password must contain at least 8 characters';
      break;
  }

  return { errorMessage };
};
