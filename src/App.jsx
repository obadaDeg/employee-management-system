import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import AllEmployeesPage from "./pages/AllEmployees/AllEmployees";
import Attendance from "./pages/Attendance/Attendance";

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
            path: ':id',
            element: <></>
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
