import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser, setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });

      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setDropdownOpen(false);
    }
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
    <header className="p-2 bg-[rgb(214,228,239)] text-gray-800 w-full shadow-xl rounded-xl">
      <div className="container flex justify-between h-16 mx-auto items-center">
        <Link to="/" className="text-3xl font-bold">
          AuXiVault!
        </Link>

        <Link to="/" className="text-lg font-bold ml-[] ">
          Home
        </Link>

        <Link to="/dashboard" className="text-lg font-bold ml-[] ">
          Dashboard
        </Link>

        {user ? (
          <div className="relative">
            
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 roundzed-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 focus:outline-none"
            >
              <span className="text-xl cursor-pointer">👤</span>
            </button>
            <div className="text-sm font-bold">
              <span className="text-gray-800">{user.firstName} {user.lastName}</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <button
                  onClick={handleUpdateProfile}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleChangePassword}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="px-6 py-2 cursor-pointer rounded border border-blue-600 text-blue-600 hover:bg-blue-50">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-2 cursor-pointer rounded bg-blue-600 text-white hover:bg-blue-700">
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
