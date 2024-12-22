import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./employee-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { employee: employeesSlice.reducer, auth: authSlice.reducer },
});

export default store;
