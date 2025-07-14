import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const UserDetailForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
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
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/${id}`, {
            withCredentials: true,
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          });
          setFormData(res.data.user);
        } catch (err) {
          toast.error("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/user/update/${id}`, formData, {
        withCredentials: true,
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
          "Content-Type": "application/json",
        },
      });
      toast.success("User updated successfully!");
      navigate("/all");
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(214, 228, 239)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-blue-700">Edit User</h2>
          <div className="space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 cursor-pointer text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/all")}
              className="bg-gray-300 cursor-pointer text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="space-y-3 text-gray-700">
          <InlineField
            label="First Name"
            value={formData.firstName || ""}
            onChange={(val) => handleChange("firstName", val)}
          />
          <InlineField
            label="Last Name"
            value={formData.lastName || ""}
            onChange={(val) => handleChange("lastName", val)}
          />
          <InlineField label="Email" value={formData.email || ""} disabled />
          <InlineField
            label="Phone"
            value={formData.phone || ""}
            onChange={(val) => handleChange("phone", val)}
          />
          <InlineField
            label="Gender"
            value={formData.gender || ""}
            type="select"
            onChange={(val) => handleChange("gender", val)}
          />
          <InlineField
            label="Address"
            value={formData.address || ""}
            onChange={(val) => handleChange("address", val)}
          />
          <InlineField
            label="Date of Birth"
            value={formData.dob || ""}
            type="date"
            onChange={(val) => handleChange("dob", val)}
          />
          <InlineField
            label="Qualification"
            value={formData.qualification || ""}
            onChange={(val) => handleChange("qualification", val)}
          />
        </div>
      </div>
    </div>
  );
};

const InlineField = ({ label, value, onChange, type = "text", disabled = false }) => {
  return (
    <div className="flex items-center">
      <span className="w-40 font-medium">{label}:</span>
      {type === "select" ? (
        <select
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-1 border-2 border-gray-300 rounded-lg"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <input
          type={type}
          max={new Date().toISOString().split('T')[0]}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={disabled}
          className={`flex-1 px-3 py-1 border-2 ${
            disabled ? "bg-gray-100 text-gray-500" : "border-gray-300"
          } rounded-lg`}
        />
      )}
    </div>
  );
};

export default UserDetailForm;
