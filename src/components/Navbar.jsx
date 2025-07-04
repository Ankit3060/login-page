import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleUpdateProfile = () => {
    setDropdownOpen(false);
    navigate("/dashboard", { state: { edit: true } });
  };

  const handleChangePassword = () => {
    setDropdownOpen(false);
    navigate("/dashboard", { state: { changePassword: true } });
  };

  return (
    <header className="p-2 bg-[rgb(230, 230, 230)] text-gray-800 w-full shadow-xl rounded-xl">
      <div className="container flex justify-between h-16 mx-auto items-center">
        <Link to="/" className="text-3xl font-bold">
          AuXiVault!
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
            >
              <span className="text-xl">👤</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <button
                  onClick={handleUpdateProfile}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleChangePassword}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="px-6 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
