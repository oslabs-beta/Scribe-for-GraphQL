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
  message: string | unknown;
}
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const login = createAsyncThunk(
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
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError =true;
      state.message = action.payload as string;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    })
  }
});

//type of action: PayloadAction<string>

export const { reset } = authSlice.actions;

export default authSlice.reducer;
