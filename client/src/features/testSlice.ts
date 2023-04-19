import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTests, saveTests as save } from '../services/testService';

export interface Test {
  id: number;
  user_id: number;
  generated_test: string;
  test_type: string;
}

interface testState {
  tests: Test[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
}

const initialState: testState = {
  tests: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getTests = createAsyncThunk(
  'tests/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTests();
    } catch (err: any) {
      const message = err.response?.data.message || err.toString();
      return rejectWithValue(message);
    }
  }
);

export const saveTests = createAsyncThunk(
  'tests/save',
  async (testData, { rejectWithValue }) => {
    try {
      return await save(testData);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || err.toString();
      return rejectWithValue(message);
    }
  }
);

export const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    reset: (state) => {
      state.tests = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getTests.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tests = action.payload;
      })
      .addCase(saveTests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveTests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(saveTests.fulfilled, (state, action) => {
        state.tests.push(action.payload);
      });
  },
});

export const { reset } = testSlice.actions;

export default testSlice.reducer;
