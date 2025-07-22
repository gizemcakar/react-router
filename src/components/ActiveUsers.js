import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ActiveUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const usersData = await response.json();
                
                // Filter for "active" users (users with ID <= 5 for demo)
                const activeUsers = usersData.filter(user => user.id <= 5);
                setUsers(activeUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div><h2>Loading active users...</h2></div>;

    return (
        <div>
            <h2>Active Users</h2>
            <p>These are the currently active users (Demo: Users 1-5):</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                    <li key={user.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #28a745', borderRadius: '5px', backgroundColor: '#d4edda' }}>
                        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#155724' }}>
                            <h3 style={{ margin: '0' }}>{user.name} ✅</h3>
                            <small>Active since: Today</small>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
