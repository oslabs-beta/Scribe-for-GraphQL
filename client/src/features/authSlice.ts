import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { loginFormSchemaType } from '../pages/Login'
import { loginUser } from '../services/authService'
//@ts-ignore
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading:false,
  message:''
}

export const login = createAsyncThunk('auth/login', async(userData:loginFormSchemaType, {rejectWithValue}) => {
  try {
    return await loginUser(userData);
  } catch(err:any) {
    const message = err.response?.data.message || err.toString();
    return rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    reset: ({isError, isSuccess, isLoading, message}) => {
      isError = false;
      isSuccess = false;
      isLoading = false; 
      message = '';
    }
  }
})



export const { reset } = authSlice.actions;

export default authSlice.reducer
