import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import UserProfile from './components/UserProfile';


function App() {
  return (
    <Router>
        <div style={{ padding: '20px' }}>
          <nav style={{ marginBottom: '20px' }}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
