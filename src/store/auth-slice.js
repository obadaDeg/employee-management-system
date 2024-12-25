import { initializeApp } from "firebase/app";
import {
  getAuth,
  getIdTokenResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAQQLAZWXtqrxYzDSvIzDpjUo7VVcYe3uw",
  authDomain: "employee-managemnt-system.firebaseapp.com",
  projectId: "employee-managemnt-system",
  storageBucket: "employee-managemnt-system.firebasestorage.app",
  messagingSenderId: "927728672402",
  appId: "1:927728672402:web:ca93c4e538dcfcb6dfd04b",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const idTokenResult = await getIdTokenResult(user);
      const role = idTokenResult.claims.role || null;

      return {
        idToken: idTokenResult.token,
        email: user.email,
        role,
        expiresIn: 3600,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserFromToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return redirect("/login");
    }

    const idTokenResult = await getIdTokenResult(user);
    console.log(idTokenResult);

    const role = idTokenResult.claims.role || null;
    const email = user.email;

    return {
      token,
      email,
      role,
    };
  } catch (error) {
    throw new Error("Failed to fetch user from token: " + error.message);
  }
};
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
      auth
        .signOut()
        .then(() => {
          console.log('Signed out');
          
          return redirect("/login");
        })
        .catch((error) => {
          return new Response(error.message);
        });
    },

    setUser(state, action) {
      const { email, role, token } = action.payload;
      state.user = email;
      state.role = role;
      state.token = token;
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
        const { idToken, email, role, expiresIn } = action.payload;
        state.token = idToken;
        state.user = email;
        state.role = role;

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

export const { logout, setRole, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
