import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Nav from "../navbar/Navbar";

import Home from "../pages/Home"
import Login from "../pages/Login";
import Register from "../pages/Register";


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


export default function AppRouter() {

  return <RouterProvider router={guestRouter} />;
}
