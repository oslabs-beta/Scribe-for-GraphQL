import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { loginFormSchemaType } from '../pages/Login';
import { loginUser } from '../services/authService';

//@ts-ignore
const user = JSON.parse(localStorage.getItem('user'));

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
interface authState {
  user: User;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const login = createAsyncThunk<User, loginFormSchemaType >(
  'auth/login',
  async (userData: loginFormSchemaType, { rejectWithValue }) => {
    try {
      return await loginUser(userData);
    } catch (err: any) {
      const message = err.response?.data.message || err.toString();
      return rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: ({ isError, isSuccess, isLoading, message }) => {
      isError = false;
      isSuccess = false;
      isLoading = false;
      message = '';
    },
  },
});

//type of action: PayloadAction<string>

export const { reset } = authSlice.actions;

export default authSlice.reducer;
