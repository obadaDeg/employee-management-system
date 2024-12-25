import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAttendance,
  addAttendance,
} from "../utils/firebase-services";

export const loadAttendance = createAsyncThunk(
  "attendance/load",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAttendance();
    } catch (error) {
      console.error("Error loading attendance:", error.message);
      return rejectWithValue(error.message);
    }
  }
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

const initialState = {
  list: [],
  status: {
    load: "idle",
    create: "idle",
  },
  error: {
    load: null,
    create: null,
  },
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAttendance.pending, (state) => {
        state.status.load = "loading";
        state.error.load = null;
      })
      .addCase(loadAttendance.fulfilled, (state, action) => {
        state.status.load = "succeeded";
        state.list = action.payload || [];
      })
      .addCase(loadAttendance.rejected, (state, action) => {
        state.status.load = "failed";
        state.error.load = action.payload;
      })
      .addCase(createAttendance.pending, (state) => {
        state.status.create = "loading";
        state.error.create = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.status.create = "failed";
        state.error.create = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
