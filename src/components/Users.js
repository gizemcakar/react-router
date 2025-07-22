import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Users() {
    return (
        <div>
            <h1>Users Section</h1>
            
            {/* Navigation for nested routes */}
            <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', padding: 0, margin: 0 }}>
                    <li><Link to="/users" style={{ color: '#007bff', textDecoration: 'none' }}>All Users</Link></li>
                    <li><Link to="/users/active" style={{ color: '#007bff', textDecoration: 'none' }}>Active Users</Link></li>
                    <li><Link to="/users/favorites" style={{ color: '#007bff', textDecoration: 'none' }}>Favorites</Link></li>
                </ul>
            </nav>

            {/* This renders the nested route content */}
            <Outlet />
        </div>
    );
}
