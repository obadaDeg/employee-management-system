import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQQLAZWXtqrxYzDSvIzDpjUo7VVcYe3uw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to authenticate.");
      }

      const data = await response.json();
      return {
        idToken: data.idToken,
        email: data.email,
        expiresIn: data.expiresIn,
      };
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

    setRole(state, action) {
      state.role = action.payload;
    },

    clearError(state) {
      state.error = null;
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

        const expirationTime = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem("token", idToken);
        localStorage.setItem("expiration", expirationTime.toISOString());
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, setRole, clearError } = authSlice.actions;
export default authSlice.reducer;
