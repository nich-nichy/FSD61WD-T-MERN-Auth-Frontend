import React, { useState } from 'react';
import './App.css';
import Home from './app/pages/Home';
import Login from './app/pages/Login';
import SignUp from './app/pages/SignUp';
import ResetPassword from './app/components/ResetPassword';
import Info from './app/components/Info';
import RequestPassword from './app/components/RequestPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="d-flex bg-light poppins-regular">
        <div style={{ width: '100%' }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/request-password-reset" element={<RequestPassword />} />
            <Route exact path="/info" element={<Info />} />
            <Route exact path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;