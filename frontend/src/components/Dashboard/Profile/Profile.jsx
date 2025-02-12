import { NavLink, Outlet } from "react-router-dom";

export default function Profile() {
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
              <a>Posts</a>
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
