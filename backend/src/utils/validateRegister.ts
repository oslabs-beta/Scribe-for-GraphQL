export const validateRegister = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): { errorMessage: null | string } => {
  let errorMessage = null;

  switch (true) {
    case !name || !email || !password || !confirmPassword:
      errorMessage = 'please enter all required fields';
      break;

    //set more specific username rules here
    case !email.includes('@'):
      errorMessage = 'please enter valid an email';
      break;

    case Number(password.length) <= 8:
      errorMessage = 'password must contain at least 8 characters';
      break;
  }

  return { errorMessage };
};
