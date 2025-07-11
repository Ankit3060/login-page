import React, { useState, useContext } from 'react';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import AllUserDashboard from "./Pages/AllUserDashboard";
import UserView from './Pages/UserView';
import EditUser from './Pages/EditUser';
import AddUser from './Pages/AddUser';

function App() {

  return (
    <>
    <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/all' element={<AllUserDashboard />} />
          <Route path="/user/:id" element={<UserView />} />
          <Route path='/user/:id/edit' element={<EditUser />} />
          <Route path='/add' element={<AddUser />} />
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  );
}

export default App;