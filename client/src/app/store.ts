import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import testReducer from '../features/testSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tests: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
