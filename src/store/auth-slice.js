import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: null,
    loading: false,
    error: null
  },
  reducers: {

  },
});

export const authActions = authSlice.actions;
export default authSlice;

// export const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'LOGIN_REQUEST':
//         return { ...state, loading: true };
//       case 'LOGIN_SUCCESS':
//         return { user: action.payload, loading: false, error: null };
//       case 'LOGIN_FAILURE':
//         return { ...state, loading: false, error: action.payload };
//       default:
//         return state;
//     }
//   };