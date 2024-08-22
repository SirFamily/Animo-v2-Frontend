import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Nav from "../navbar/Navbar";

import Home from "../pages/Home"
import Login from "../pages/Login";
import Register from "../pages/Register";

import List_host from "../pages/list_host/List_host";

import Dashboard from "../pages/dashboard/Dashboard"
import Pets from "../pages/dashboard/pets/Pets"
import Host from "../pages/dashboard/host/Hosts";
import Request from "../pages/dashboard/list_request/Requests"
import History from "../pages/dashboard/list_history/History_R"
import Profile from "../pages/dashboard/profile/Profile_user"

import Host_add from "../pages/dashboard/host/Host_add";
import Room_add from "../pages/dashboard/host/room/Room_add";
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
        { index: true, element: <List_host /> },
        { path: 'dashboard/', element: <Dashboard />,},
        { path: 'dashboard/pets', element: <Pets />,},
        { path: 'dashboard/host', element: <Host />,},
        { path: 'dashboard/host/create-host', element: <Host_add />,},
        { path: 'dashboard/host/create-host/room', element: <Room_add />,},
        { path: 'dashboard/request', element: <Request />,},
        { path: 'dashboard/history', element: <History />,},
        { path: 'dashboard/profile', element: <Profile />,},
      ]
    },
  ]);

export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.id ? userRouter : guestRouter
  return <RouterProvider router={finalRouter} />;
}
