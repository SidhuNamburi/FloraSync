import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/login';
import Signup from './screens/signup';
import ForgotPassword from './screens/forgotpassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/ForgotPassword' element={<ForgotPassword />}/>
      </Routes>
    </Router>
  );
}

export default App;