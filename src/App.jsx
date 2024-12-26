import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import AllEmployeesPage from "./pages/AllEmployees/AllEmployees";
import Attendance from "./pages/Attendance/Attendance";

import LoginPage from "./pages/Auth/LoginPage";
import { loginLoader } from "./utils/loginLoader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/auth-slice";
import { loadEmployees } from "./store/employee-slice";
import { loadAttendance } from "./store/attendance-slice";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage/EmployeeDetailsPage";
import ErrorPage from "./pages/RootLayout/ErrorPage";
import ErrorEmployee from "./pages/AllEmployees/ErrorEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles="All">
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "employees",
        // element: (
        //   <ProtectedRoute allowedRoles={["admin", "root"]}>
        //     <EmployeeLayout />
        //   </ProtectedRoute>
        // ),
        errorElement: <ErrorEmployee />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={["admin", "root"]}>
                <AllEmployeesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute allowedRoles={["admin", "root"]}>
                <EmployeeDetailsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "attendance",
        element: (
          <ProtectedRoute allowedRoles={["admin", "root"]}>
            <Attendance />
          </ProtectedRoute>
        ),
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
  const user = useAuth();
  // dispatch(
  //   setUser({
  //     email: user.email,
  //     role: user.role,
  //     token: user.token,
  //   })
  // );

  // const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        dispatch(
          setUser({
            email: user.email,
            role: user.role,
            token: user.accessToken,
          })
        );
        dispatch(loadEmployees());
        dispatch(loadAttendance());
      } catch (error) {
        console.error("Error fetching user from token:", error.message);
      }
    };

    fetchUserFromToken();
  }, [dispatch, user]);

  return <RouterProvider router={router} />;
}

export default App;
