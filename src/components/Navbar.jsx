import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="p-2 bg-grey-500 text-coolGray-800 w-full">
      <div className="container flex justify-between h-16 mx-auto">
        <Link
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2 text-3xl"
        >
          AuXiVault!
        </Link>

        <div className="items-center flex-shrink-0">
          <Link to="/login">
            <button className="self-center px-8 py-3 rounded cursor-pointer mr-6">
              Sign in
            </button>
          </Link>
          <Link to="/signup">
            <button className="self-center px-8 py-3 font-semibold cursor-pointer rounded bg-blue-600 text-white">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
