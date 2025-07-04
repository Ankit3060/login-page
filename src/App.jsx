import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard'element={<Dashboard />} />
        </Routes>
    </>
  );
}

export default App;