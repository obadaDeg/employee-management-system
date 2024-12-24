import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, login } from '../utils/api/auth';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
  try {
    const response = await getUser();
    const { authToken, user } = response[1];
    return { authToken, user };
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch user');
  }
});

export const performLogin = createAsyncThunk('auth/login', async (_, thunkAPI) => {
  try {
    const response = await login();
    const { authToken, user } = response[1];
    return { authToken, user };
  } catch (error) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.authToken = null;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.authToken = action.payload.authToken;
        state.currentUser = action.payload.user;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.authToken = null;
        state.currentUser = null;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(performLogin.fulfilled, (state, action) => {
        state.authToken = action.payload.authToken;
        state.currentUser = action.payload.user;
      })
      .addCase(performLogin.rejected, (state, action) => {
        state.authToken = null;
        state.currentUser = null;
        state.error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice;
