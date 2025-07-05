import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  const initialUser = {
    name: "Ankit Kumar",
    email: "ankit@gmail.com",
    phone: "9392833614",
    gender: "Male",
    joined: "01-07-2025",
    address: "Balongi, Mohali, Punjab",
    dob: "09-06-2004",
    qualification: "B.E Computer Science",
  };

  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...initialUser });

  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (location.state?.edit) setEditMode(true);
    if (location.state?.changePassword) setEditPassword(true);
  }, [location.state]);

  const handleChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSave = () => {
    setUser(editedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setEditMode(false);
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number."
      );
      return;
    }

    setEditPassword(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    alert("Password updated successfully!");
  };

  const handlePasswordCancel = () => {
    setEditPassword(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <div className="min-h-screen bg-[rgb(214, 228, 239)] from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-blue-700">User Dashboard</h2>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3 text-gray-700">
          <InlineField label="Name" value={editedUser.name} editable={editMode} onChange={(val) => handleChange("name", val)} />
          <InlineField label="Email" value={user.email} editable={editMode} />
          <InlineField label="Phone" value={editedUser.phone} editable={editMode} onChange={(val) => handleChange("phone", val)} />
          <InlineField label="Gender" value={editedUser.gender} editable={editMode} type="select" onChange={(val) => handleChange("gender", val)} />
          <InlineField label="Address" value={editedUser.address} editable={editMode} onChange={(val) => handleChange("address", val)} />
          <InlineField label="Date of Birth" value={editedUser.dob} editable={editMode} type="date" onChange={(val) => handleChange("dob", val)} />
          <InlineField label="Qualification" value={editedUser.qualification} editable={editMode} onChange={(val) => handleChange("qualification", val)} />
          <InlineField label="Member Since" value={new Date(editedUser.joined).toLocaleDateString()} editable={editMode} />
        </div>


        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">Password</h3>
            {!editPassword ? (
              <button
                onClick={() => setEditPassword(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                Change
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handlePasswordSave}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={handlePasswordCancel}
                  className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {editPassword && (
            <div className="mt-3 space-y-3">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InlineField = ({ label, value, editable = false, onChange, type = "text" }) => {
  return (
    <div className="flex items-center">
      <span className="w-40 font-medium">{label}:</span>
      {editable ? (
        type === "select" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-1 border border-gray-300 rounded"
          />
        )
      ) : (
        <span className="flex-1">{type === "date" ? new Date(value).toLocaleDateString() : value}</span>
      )}
    </div>
  );
};

export default Dashboard;
