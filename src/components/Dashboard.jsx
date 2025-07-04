import React, { useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: 'Ankit Kumar',
    email: 'ankit@gmail.com',
    phone: '9392833614',
    gender: 'Male',
    joined: '01-07-2025',
  });

  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameSave = () => {
    setUser({ ...user, name: newName });
    setEditName(false);
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, and a number.');
      return;
    }
    setEditPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      alert('Password changed successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(214, 228, 239) from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <h2 className="text-4xl font-bold text-center text-blue-700">User Dashboard</h2>

        {/* Name Section */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">Name: {user.name}</h3>
            <button
              onClick={() => setEditName(!editName)}
              className="text-blue-600 hover:text-blue-800 transition"
            >
              {editName ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {editName ? (
            <div className="mt-2 space-y-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleNameSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          ) : (
            null
          )}
        </div>


        {/* Static Info */}
        <div className="space-y-2 text-gray-700">
          <div>
            <h4 className="font-medium p-2">Email: {user.email}</h4>
            {/* <p className="text-gray-800">{user.email}</p> */}
          </div>
          <div>
            <h4 className="font-medium p-2">Phone: {user.phone}</h4>
            {/* <p className="text-gray-800">{user.phone}</p> */}
          </div>
          <div>
            <h4 className="font-medium p-2">Gender: {user.gender}</h4>
            {/* <p className="text-gray-800">{user.gender}</p> */}
          </div>
          <div>
            <h4 className="font-medium">Member Since: {new Date(user.joined).toLocaleDateString()}</h4>
            
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">Password</h3>
            <button
              onClick={() => setEditPassword(!editPassword)}
              className="text-blue-600 hover:text-blue-800 transition"
            >
              {editPassword ? 'Cancel' : 'Change'}
            </button>
          </div>
          {editPassword && (
            <div className="mt-3 space-y-3">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                minLength={8}
                maxLength={20}
                onChange={(e) => setNewPassword(e.target.value)}
                
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                minLength={8} 
                maxLength={20}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
              <button
                onClick={handlePasswordSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;