import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import employeesReducer from "./employee-slice";
import attendanceReducer from "./attendance-slice";
import rolesReducer from "./role-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    attendance: attendanceReducer,
    roles: rolesReducer,
  },
});

export default store;
