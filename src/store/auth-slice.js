import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAuthorization } from "../utils/firebase-services";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await getUserAuthorization(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    role: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { idToken, email, expiresIn } = action.payload;
        state.token = idToken;
        state.user = email;
      
        const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.setItem("token", idToken);
        localStorage.setItem("expiration", expirationTime.toISOString());
      })      
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
