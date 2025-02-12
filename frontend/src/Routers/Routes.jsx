import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/Login";
import Signup from "../components/Signup/Signup";
import DashBoard from "../components/Dashboard/Dashboard";
import CrimeReportPost from "../components/Dashboard/CrimeReport/CrimeReportPost";

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
    path:"/dashboard",
    element: <DashBoard/>,
    children: [
      {
        path: "/dashboard/feed",
        element: <CrimeReportPost/>
      },
    ],
  }
]);

export default router;