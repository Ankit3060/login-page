import React, { useEffect, useState, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { IoMdArrowBack } from "react-icons/io";
import { Navigate } from "react-router-dom";

const UserView = () => {
  const { id } = useParams();
  const [user, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchUser = async () => {
        try {

          const token = localStorage.getItem("token");
          if (!token) {
            toast.error("You are not authenticated, Please log in.");
            return;
          }

          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
            {
              withCredentials: true,
              headers: {
                // "x-api-key": import.meta.env.VITE_API_KEY,
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        }
      };
      
      fetchUser();
    }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authenticated, Please log in.");
        return;
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/${id}`, {
        withCredentials: true,
        headers: {
          // "x-api-key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.response?.data?.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center">
          <p className="text-red-500 mb-4">User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex justify-start text-gray-800 p-4 text-4xl mt-2 ml-30">
      <button className="bg-white p-2 cursor-pointer rounded-full shadow-md hover:bg-gray-100 transition-colors" onClick={() => navigate("/all")}>
        <IoMdArrowBack />
      </button>
    </div>
    <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center p-4 mt-[-65px]">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center">User Details</h2>

        <div className="space-y-3 text-gray-700">
          <InlineField label="First Name" value={user.firstName || ""} />
          <InlineField label="Last Name" value={user.lastName || ""} />
          <InlineField label="Email" value={user.email || ""} />
          <InlineField label="Phone" value={user.phone || ""} />
          <InlineField label="Gender" value={user.gender || ""} />
          <InlineField label="Address" value={user.address || ""} />
          <InlineField
            label="Date of Birth"
            value={user.dob ? new Date(user.dob).toLocaleDateString() : ""}
          />
          <InlineField label="Qualification" value={user.qualification || ""} />
          <InlineField
            label="Member Since"
            value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
          />
        </div>
      </div>
    </div>
    </>
  );
};

const InlineField = ({ label, value }) => (
  <div className="flex items-center">
    <span className="w-40 font-medium">{label}:</span>
    <span className="flex-1">{value}</span>
  </div>
);

export default UserView;
