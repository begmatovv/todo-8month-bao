import React from "react";

import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { user } = useSelector((state) => state.userState);
  return (
    <div className="max-w-[1100px] mx-auto px-5">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn text-xl btn-primary">MyTodoList </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`${user.photoURL}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={() => signOut(auth)} className="btn btn-sm ">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
