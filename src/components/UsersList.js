import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                
                const usersData = await response.json();
                setUsers(usersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div>
                <h2>Loading...</h2>
                <p>Fetching users data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>Failed to load users</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>All Users List</h2>
            <p>Click on any user to view their profile:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                    <li key={user.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                            <h3 style={{ margin: '0', color: '#007bff' }}>{user.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
