import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([ AllCommunityModule ]);
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
    
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
        console.log('User fetched succeessfully!');
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
      
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const CustomButtonComponent = (params) => {

    const handleView = () => {
      navigate(`/user/${params.data.id}`);
      toast.info(`${params.data.fullName} details`);
    };

    const handleDelete = async () => {
      const userId = params.data.id;

      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/user/delete/${userId}`, {
          withCredentials: true,
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY,
          },
        });
        toast.success("User deleted successfully!");
        setUsers(prev => prev.filter(user => user.id !== userId));
      } catch (error) {
        toast.error("Failed to delete user.");
      }
    };

    const handleEdit = ()=>{
      console.log("Editing user:", params.data.id);
      
    }

    return (
      <div className="flex gap-2">
        <button 
          className="px-2 py-1 text-xl rounded-2xl cursor-pointer mr-4 hover:bg-blue-400"
          onClick={handleView}
        >
          <FaRegEye />

        </button>

        <button 
          className="px-2 py-1 text-xl rounded-2xl cursor-pointer mr-4 hover:bg-green-400"
          onClick={handleEdit}
        >
          <FaUserEdit />

        </button>

        <button 
          className=" px-2 py-1 text-xl rounded-2xl cursor-pointer hover:bg-red-400"
          onClick={handleDelete}
        >
          <MdDelete />

        </button>

      </div>
    );
  };
  const columns = [
    { field: 'id' , headerName:'ID' , width: 140},
    { field: 'fullName', width: 140},
    { field: 'email', width: 170},
    { field: 'phone', width: 130},
    { field: 'gender',  width: 140},
    { field: 'dob', headerName: 'DOB', width: 130},
    { field: 'qualification', width: 180 },
    { field: 'createdAt', headerName: 'Member Since', width: 170},
    { field: 'actions',headerName: 'Actions', cellRenderer: CustomButtonComponent, width: 200},
  ];

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 50];

  return (
    <>
    <div  style={{ height: 600, width: '100%', padding: '20px' }}>
      <AgGridReact
              rowData={users}
              columnDefs={columns}
              loading={loading}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
          />
    </div>
    </>
  );
};

export default UserDashboard;