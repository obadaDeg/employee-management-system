import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import AllEmployeesPage from "./pages/AllEmployees";
import Attendance from "./pages/Attendance";

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
            element: <AllEmployeesPage />,
          },
          {
            path: 'new',
            element: <Attendance />
          }
        ],
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
