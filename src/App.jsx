import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import SignUpLogin, { action as signUpLoginAction } from "./pages/SignUpLogin";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import { verifyUserApi } from "./utils/apiUtil";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/user";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SignUpLogin />,
        action: signUpLoginAction,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />,
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "links",
        element: <h1>Links Page</h1>,
      },
      {
        path: "analytics",
        element: <h1>Analytics Page</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
