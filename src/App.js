import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import UsersList from './components/UsersList';
import ActiveUsers from './components/ActiveUsers';
import Favorites from './components/Favorites';
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
            
            {/* Nested Users Routes */}
            <Route path="/users" element={<Users />}>
              <Route index element={<UsersList />} />
              <Route path="active" element={<ActiveUsers />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path=":id" element={<UserProfile />} />
            </Route>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
