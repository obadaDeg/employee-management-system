import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import AllEmployeesPage from "./pages/AllEmployees/AllEmployees";
import Attendance from "./pages/Attendance/Attendance";

import LoginPage from "./pages/Auth/LoginPage";
import { loginLoader } from "./utils/loginLoader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromToken, setUser } from "./store/auth-slice";
import { fetchEmployees } from "./utils/firebase-services";
import { loadEmployees } from "./store/employee-slice";
import { loadAttendance } from "./store/attendance-slice";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage/EmployeeDetailsPage";
import ErrorPage from "./pages/RootLayout/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "employees",
        children: [
          {
            index: true,
            element: <AllEmployeesPage />,
          },
          {
            path: ":id",
            element: <EmployeeDetailsPage />,
          },
        ],
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: loginLoader,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const user = await getUserFromToken();

        dispatch(
          setUser({
            email: user.email,
            role: user.role,
            token: user.token,
          })
        );
        dispatch(loadEmployees());
        dispatch(loadAttendance());
      } catch (error) {
        console.error("Error fetching user from token:", error.message);
      }
    };

    fetchUserFromToken();
  }, [dispatch, token]);

  return <RouterProvider router={router} />;
}

export default App;
