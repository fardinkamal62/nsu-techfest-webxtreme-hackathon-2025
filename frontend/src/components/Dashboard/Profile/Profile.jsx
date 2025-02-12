import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState();


  useEffect(() => {
    localStorage.getItem("token") && setToken(localStorage.getItem("token"));
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.log("error", error));
  });

  return (
    <>
      <div className="flex flex-col justify-center border-t-4">
        <div className="flex">
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mt-3">
            <li>
              <NavLink to="/dashboard/profile/ViewProfile">View Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile/update">Update Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile/CrimePost">Posts</NavLink>
            </li>
            <li>
              <a>Comments</a>
            </li>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
