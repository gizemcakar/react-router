import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import UsersList from './components/UsersList';
import ActiveUsers from './components/ActiveUsers';
import Favorites from './components/Favorites';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';

function NavigationWrapper() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '*' || !['/', '/about', '/users'].some(path => 
    location.pathname === path || location.pathname.startsWith('/users')
  );

  return (
    <>
      {!isNotFoundPage && (
        <nav style={{ marginBottom: '20px' }}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>
      )}
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
        
        {/* 404 Not Found - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <NavigationWrapper />
      </div>
    </Router>
  );
}

export default App;
