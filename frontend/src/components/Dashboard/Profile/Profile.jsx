import { Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <div className="flex flex-row justify-center border-t-4">
        <div className="">
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mt-3">
            <li>
              <a>Update Profile</a>
            </li>
            <li>
              <a>Posts</a>
            </li><li>
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
