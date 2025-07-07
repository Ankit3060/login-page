import React, { useState, useContext } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';

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
        </Routes>
        <ToastContainer position='top-center'/>
      </Router>
    </>
  );
}

export default App;