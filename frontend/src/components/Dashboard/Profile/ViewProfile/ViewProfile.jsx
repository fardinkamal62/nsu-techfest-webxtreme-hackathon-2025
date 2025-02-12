import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

export default function ViewProfile() {
  return (
    <>
      <div className="mt-7 flex">
        <div className="hero-content flex flex-col lg:flex-row items-start justify-center">
          <img
            src="https://www.shutterstock.com/image-vector/cheerful-funny-cartoon-childrens-robot-600nw-2407552137.jpg"
            className="max-w-sm rounded-lg shadow-2xl border-2"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">First Name:  <span className="text-amber-700">{"Palmer"}</span></h1>
            <h1 className="text-xl font-medium">Last Name: <span className="text-amber-700">{"Palmer Gould"}</span></h1>
            <h1 className="text-xl font-medium">Email: <span className="text-amber-700">{"PalmerGould@gmail.com"}</span> </h1>
            <h1 className="text-xl font-medium">National ID: <span className="text-amber-700">{"12321312"}</span></h1>
            <h1 className="text-xl font-medium flex">Verified: <span className="text-red-600 flex items-center text-2xl"><IoMdClose /></span></h1>
            <NavLink to="/dashboard/profile/update" className="btn btn-wide btn-info">Update Profile</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
