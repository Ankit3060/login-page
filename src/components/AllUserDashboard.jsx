import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setIsAuthenticated, setUser } = useContext(AuthContext);
    
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


  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/all`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
          },
        }
      );
      const userArray = res.data.users;

      const formattedData = userArray.map((user) => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob?.split('T')[0] || '',
        qualification: user.qualification || '',
        address: user.address || '',
        createdAt : user.createdAt ? user.createdAt.split('T')[0] : '',
      }));
      setUsers(formattedData);
        toast.success('Users fetched successfully!');
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Failed to fetch users. Please login again.');
    } finally {
      setLoading(false);
      
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 140, },
    { field: 'gender', headerName: 'Gender', width: 100, },
    { field: 'dob', headerName: 'DOB', width: 110, },
    { field: 'qualification', headerName: 'Qualification', width: 130, },
    { field: 'address', headerName: 'Address', width: 250, },
    { field: 'createdAt', headerName: 'Member Since', width: 180},
  ];

  return (
    <>
    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
      />
    </Box>
    </>
  );
};

export default UserDashboard;



// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';

// const UserDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const { setIsAuthenticated, setUser } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
//           {
//             withCredentials: true,
//             headers: {
//               "x-api-key": import.meta.env.VITE_API_KEY,
//             },
//           }
//         );
//         setIsAuthenticated(true);
//         setUser(response.data.user);
//       } catch (error) {
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/all`, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': import.meta.env.VITE_API_KEY,
//         },
//       });

//       const formattedData = res.data.users.map((user) => ({
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         gender: user.gender,
//         dob: user.dob?.split('T')[0] || '',
//         qualification: user.qualification || '',
//         address: user.address || '',
//         createdAt: user.createdAt?.split('T')[0] || '',
//       }));

//       setUsers(formattedData);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);


//   return (
//     <div className="bg-white rounded-3xl p-4 flex items-center justify-center">
//       <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>DOB</th>
//             <th>Qualification</th>
//             <th>Address</th>
//             <th>Member Since</th>
//           </tr>
//         </thead>
//         <tbody className=''>
//           {users.map((user) => {
//             return (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.firstName} {user.lastName}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.gender}</td>
//                 <td>{user.dob}</td>
//                 <td>{user.qualification}</td>
//                 <td>{user.address}</td>
//                 <td>{user.createdAt}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserDashboard;