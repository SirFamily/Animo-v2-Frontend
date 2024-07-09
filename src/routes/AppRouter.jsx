import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Nav from "../navbar/Navbar";

import Home from "../pages/Home"
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/dashboard/Dashboard"
import Pets from "../pages/dashboard/pets/Pets"
const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Home />
        <Outlet />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const userRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <Outlet />
        </>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard/pets', element: <Pets />,},
    
      ]
    },
  ]);

export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.id ? userRouter : guestRouter
  return <RouterProvider router={finalRouter} />;
}
