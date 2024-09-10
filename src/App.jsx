import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';

import {
  BrowserRouter as Router, Route, Routes

} from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="d-flex bg-light poppins-regular">
        <div style={{ width: '100%' }}>
          <Routes>
            <Route exact path="/signup" element={<Login />} />
            <Route exact path="/login" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;