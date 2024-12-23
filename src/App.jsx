import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import AllEmployeesPage from "./pages/AllEmployees/AllEmployees";
import Attendance from "./pages/Attendance/Attendance";
// import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
            element: (
              // <ProtectedRoute>
                <AllEmployeesPage />
              // </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: <></>,
          },
        ],
      },
      {
        path: "attendance",
        element: (
          // <ProtectedRoute>
            <Attendance />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
