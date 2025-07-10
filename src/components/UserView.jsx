import React, { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserView = () => {
  const { id } = useParams();
  const [user, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
            {
              withCredentials: true,
              headers: {
                "x-api-key": import.meta.env.VITE_API_KEY,
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/${id}`, {
        withCredentials: true,
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
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
    <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center p-4">
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
  );
};

const InlineField = ({ label, value }) => (
  <div className="flex items-center">
    <span className="w-40 font-medium">{label}:</span>
    <span className="flex-1">{value}</span>
  </div>
);

export default UserView;
