import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employeesSlice",
  initialState: {},
  reducers: {
    addEmployee() {},
    deleteEmploye() {},
    editEmployeeInfo() {},
  },
});

export const employeeActions = employeesSlice.actions;
export default employeesSlice;
