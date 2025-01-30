import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import SignUpLogin, { action as signUpLoginAction } from "./pages/SignUpLogin";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Links, { loader as linksPageLoader } from "./pages/Links";
import Loader from "./components/Loader";
import Redirector from "./pages/Redirector";
import Analytics, { loader as analyticsLoader } from "./pages/Analytics";

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
      {
        path: "/:linkId",
        element: <Redirector />,
      },
    ],
  },
  {
    path: "/dashboard",
    hydrateFallbackElement: <Loader />,
    element: (
      <PrivateRoute>
        <DashboardLayout />,
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "links",
        element: <Links />,
        loader: linksPageLoader,
      },
      {
        path: "analytics",
        element: <Analytics />,
        loader: analyticsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
