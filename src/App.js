import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPassword from './screens/Forgotpassword'; 
import User from './screens/User';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route  path="/User" element={<User />}/>
      </Routes>
  );
}

export default App;