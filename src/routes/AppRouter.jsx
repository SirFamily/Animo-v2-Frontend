import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Nav from "../navbar/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import LoginAdmin from "../pages/ADMIN/Login";
import RegisterAdmin from "../pages/ADMIN/Register";
import VerifyHost from "../pages/ADMIN/vertify/verify_host";
import VerifyDetail from "../pages/ADMIN/vertify/verify_detail";

import List_host from "../pages/list_host/List_host";
import Pets from "../pages/dashboard/pets/Pets";
import Host from "../pages/dashboard/host/Hosts";
import Request from "../pages/dashboard/list_request/Requests";
import History from "../pages/dashboard/list_history/History_R";
import Profile from "../pages/dashboard/profile/Profile_user";

import Host_add from "../pages/dashboard/host/Host_add";
import Room_add from "../pages/dashboard/host/room/Room_add";
import HostView from "../pages/list_host/view_host/Host_view";
import Req_detail from "../pages/dashboard/list_request/Req_detail";
import Req_detail_host from "../pages/dashboard/list_request/Req_detail_host";
import History_detail from "../pages/dashboard/list_history/History_detail";

// Guest Routes
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
  {
    path: "/login/a",
    element: <LoginAdmin />,
  },
  {
    path: "/register/a",
    element: <RegisterAdmin />,
  },
]);

// Admin Routes
const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <VerifyHost /> },
      { path: "verify/detail/:id", element: <VerifyDetail /> },
    ],
  },
]);

// User Routes
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
      { path: "dashboard/pets", element: <Pets /> },
      { path: "dashboard/host", element: <Host /> },
      { path: "dashboard/host/create-host", element: <Host_add /> },
      { path: "dashboard/host/create-room/:hid", element: <Room_add /> },
      { path: "dashboard/request", element: <Request /> },
      { path: "dashboard/history", element: <History /> },
      { path: "dashboard/profile", element: <Profile /> },
      { path: "host/:hostId", element: <HostView /> },
      {
        path: "dashboard/request/booking/detail/:reqId",
        element: <Req_detail />,
      },
      {
        path: "dashboard/request/booking/detail/host/:reqId",
        element: <Req_detail_host />,
      },
      { path: "dashboard/history/detail/:reqId", element: <History_detail /> },
    ],
  },
]);

export default function AppRouter() {
  const { user, admin } = useAuth();

  let finalRouter;

  if (admin?.id) {
    finalRouter = adminRouter;
    return <RouterProvider router={finalRouter} />;
  } else if (user?.id) {
    finalRouter = userRouter;
    return <RouterProvider router={finalRouter} />;
  } else {
    finalRouter = guestRouter;
  }

  return <RouterProvider router={finalRouter} />;
}
