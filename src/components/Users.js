import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
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
                <h1>Loading...</h1>
                <p>Fetching users data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>Failed to load users</p>
                <p>{error}</p>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>All Users</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                    <li key={user.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                        <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                            <h3 style={{ margin: '0', color: '#007bff' }}>{user.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>Back to Home</Link>
        </div>
    );
}
