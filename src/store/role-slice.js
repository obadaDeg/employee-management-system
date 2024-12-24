import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRoles } from "../utils/firebase-services";

export const loadRoles = createAsyncThunk("roles/load", fetchRoles);

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadRoles.fulfilled, (state, action) => {
      state.list = action.payload.documents || [];
    });
  },
});

export default rolesSlice.reducer;
