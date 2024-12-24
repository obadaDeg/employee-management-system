import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../utils/firebase-services";

export const loadEmployees = createAsyncThunk("employees/load", fetchEmployees);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employeeData, { rejectWithValue }) => {
    try {
      return await addEmployee(employeeData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employees/edit",
  async ({ employeeId, data }, { rejectWithValue }) => {
    try {
      return await updateEmployee(employeeId, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeEmployee = createAsyncThunk(
  "employees/remove",
  async (employeeId, { rejectWithValue }) => {
    try {
      return await deleteEmployee(employeeId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.list = action.payload.documents || [];
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (emp) => emp.id === action.meta.arg.employeeId
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((emp) => emp.id !== action.meta.arg);
      });
  },
});

export default employeesSlice.reducer;
