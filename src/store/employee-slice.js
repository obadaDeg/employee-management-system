import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../utils/firebase-services";

export const loadEmployees = createAsyncThunk(
  "employees/load",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchEmployees();
    } catch (error) {
      console.error("Error loading employees:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

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

const initialState = {
  list: [],
  status: {
    load: "idle",
    create: "idle",
    edit: "idle",
    remove: "idle",
  },
  error: {
    load: null,
    create: null,
    edit: null,
    remove: null,
  },
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load Employees
      .addCase(loadEmployees.pending, (state) => {
        state.status.load = "loading";
        state.error.load = null;
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.status.load = "succeeded";
        state.list = action.payload || [];
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.status.load = "failed";
        state.error.load = action.payload;
      })
      .addCase(createEmployee.pending, (state) => {
        state.status.create = "loading";
        state.error.create = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status.create = "failed";
        state.error.create = action.payload;
      })
      .addCase(editEmployee.pending, (state) => {
        state.status.edit = "loading";
        state.error.edit = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.status.edit = "succeeded";
        const index = state.list.findIndex(
          (emp) => emp.id === action.meta.arg.employeeId
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.status.edit = "failed";
        state.error.edit = action.payload;
      })
      .addCase(removeEmployee.pending, (state) => {
        state.status.remove = "loading";
        state.error.remove = null;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.status.remove = "succeeded";
        state.list = state.list.filter(
          (emp) => emp.id !== action.meta.arg
        );
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.status.remove = "failed";
        state.error.remove = action.payload;
      });
  },
});

export default employeesSlice.reducer;
