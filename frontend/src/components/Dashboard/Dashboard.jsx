import { useState } from "react";
import DashBoardNav from "./DashBoardNav/DashboardNav";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  const [openSide, setOpenSide] = useState(true);

  return (
    <>
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
        <div className="flex items-center py-2 justify-end">
          {/* <!-- Sidebar --> */}
          <button
            className="btn btn-square text-end"
            onClick={() => setOpenSide(!openSide)}
          >
            {openSide ? "Close" : "Open"}
          </button>
        </div>
      </div>

      <div
        className={`hs-overlay  ${
          openSide ? "translate-x-0" : "-translate-x-full"
        }  transition-all duration-300 transform w-[260px] fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0`}
      >
        <div className="px-8 pt-4">
          <a className="flex-none text-xl inline-block font-semibold text-gray-500">
            DashBoard
          </a>
        </div>

        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap">
          <ul className="menu rounded-box w-56 text-gray-700 border">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href=""></a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        <DashBoardNav/>
        <Outlet />
      </div>
    </>
  );
};

export default DashBoard;