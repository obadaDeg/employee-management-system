import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: null,
  },
  reducers: {},
});

export const authActions = authSlice.actions;
export default authSlice;
