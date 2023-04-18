import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { loginFormSchemaType } from '../pages/Signin';
import { registerFormSchemaType } from '../pages/Signin';
import { loginUser, logoutUser, registerUser } from '../services/authService';

//@ts-ignore
const user = JSON.parse(localStorage.getItem('user'));

export interface User {
  email: string;
  name: string;
}
interface authState {
  user: User | null;
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

export const login = createAsyncThunk<User, loginFormSchemaType>(
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logoutUser();
    } catch (err: any) {
      const message = err.response?.data.message || err.toString();
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk<User, registerFormSchemaType>(
  'auth/register',
  async (userData: registerFormSchemaType, { rejectWithValue }) => {
    try {
      return await registerUser(userData);
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
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state: authState) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

//type of action: PayloadAction<string>

export const { reset } = authSlice.actions;

export default authSlice.reducer;
