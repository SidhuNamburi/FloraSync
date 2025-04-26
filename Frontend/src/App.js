import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPassword from './screens/Forgotpassword'; 
import User from './screens/User';
import Allplants from './screens/Allplants';
import PlantLibrary from './screens/PlantLibrary';
import About from './screens/about';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route  path="/User" element={<User />}/>
        <Route  path="/allplants" element={<Allplants/>}/>
        <Route  path="/plantlibrary" element={<PlantLibrary/>}/>
        <Route  path="/about" element={<About/>}/>
      </Routes>
  );
}

export default App;