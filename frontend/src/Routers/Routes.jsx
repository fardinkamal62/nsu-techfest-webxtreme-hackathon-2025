import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/Login";
import Signup from "../components/Signup/Signup";

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
  }
]);

export default router;