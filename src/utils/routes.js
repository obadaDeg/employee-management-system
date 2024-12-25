
import RootLayout from "../pages/RootLayout/RootLayout";
import HomePage from "../pages/HomePage/HomePage";
import AllEmployeesPage from "../pages/AllEmployeesPage/AllEmployeesPage";
import Attendance from "../pages/Attendance/Attendance";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { checkAuthToken } from "./firebase-services";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    loader: checkAuthToken,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "employees",
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
            element: <div>Employee Details Placeholder</div>,
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
  { path: "login", element: <LoginPage /> },
];

export default routes;
