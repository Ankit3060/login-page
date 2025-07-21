import React, { useEffect, useState, useRef } from 'react';
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
import { HiUserAdd } from "react-icons/hi";
import {api_key,api_url} from '../context/links.js';

const UserDashboard = () => {
  document.title = "All User";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setIsAuthenticated, setUser } = useContext(AuthContext);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [input, setInput] = useState('')

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


  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not authenticated, Please log in.");
        return;
      }

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/all`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            // 'x-api-key': import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${token}`,
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
      // setFilteredUsers(formattedData); 
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
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You are not authenticated, Please log in.");
          return;
        }

        await axios.delete(`${api_url}/api/v1/user/delete/${userId}`, {
          withCredentials: true,
          headers: {
            // 'x-api-key': api_key,
            Authorization: `Bearer ${token}`,
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
      navigate(`/user/${params.data.id}/edit`);
      toast.warning(`Editing ${params.data.fullName}`);
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
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [10, 20, 50];

  const gridRef = useRef();

  // const onFilterTextBoxChanged = ()=>{
  //   gridRef.current.api.setGridOption("quickFilterText",
  //     document.getElementById("filter-text-box").value);
  // }
  
  const onFilterTextBoxChanged = (e)=>{
    const value = e.target.value.toLowerCase();
    setInput(value);
    
    // const filtered = users.filter((user)=>user.fullName.toLowerCase().includes(value));
    // setFilteredUser(filtered);
  }

  const filtereddata=users?.filter((user)=>user.fullName.toLowerCase().includes(input));

  return (
    <>
    <div className='flex justify-between items-center p-4'>
      <input 
        type="search" 
        id='filter-text-box'
        placeholder='Search users...' 
        value={input}
        className='border p-2 rounded-2xl text-black bg-white border-gray-300' 
        onChange={onFilterTextBoxChanged}

        />

      <button 
        className='cursor-pointer float-right text-3xl hover:text-blue-500 mr-[70px]'
        onClick={() => navigate("/add")}>
        <HiUserAdd />
      </button>
    </div>

    <div  style={{ height: 600, width: '100%', padding: '20px' }}>
      <AgGridReact
              ref={gridRef}
              rowData={filtereddata}
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