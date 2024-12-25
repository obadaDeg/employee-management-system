import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAttendance,
  addAttendance,
  // updateAttendance,
  // deleteAttendance,
} from "../utils/firebase-services";

export const loadAttendance = createAsyncThunk(
  "attendance/load",
  fetchAttendance
);

export const createAttendance = createAsyncThunk(
  "attendance/create",
  async (attendanceData, { rejectWithValue }) => {
    try {
      return await addAttendance(attendanceData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAttendance.fulfilled, (state, action) => {
      state.list = action.payload.documents || [];
    });
  },
});

export default attendanceSlice.reducer;