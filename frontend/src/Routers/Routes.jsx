import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/Login";
import Signup from "../components/Signup/Signup";
import DashBoard from "../components/Dashboard/Dashboard";
import Profile from "../components/Dashboard/Profile/Profile";
import PassReset from "../components/Dashboard/PassReset/PassReset";
import UpdateProfile  from "../components/Dashboard/Profile/UpdateProfile/UpdateProfile";
import  ViewProfile  from "../components/Dashboard/Profile/ViewProfile/ViewProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/passwordReset",
    element: <PassReset/>
  },
  {
    path:"/dashboard",
    element: <DashBoard/>,
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile/>,
        children: [
          {
            path: "/dashboard/profile/update",
            element: <UpdateProfile/>
          },
          {
            path: "/dashboard/profile/ViewProfile",
            element: <ViewProfile/>
          }
        ],
      },
    ],
  }
]);

export default router;