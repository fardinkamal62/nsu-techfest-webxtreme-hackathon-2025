import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;