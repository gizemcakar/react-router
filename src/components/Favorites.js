import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const usersData = await response.json();
                
                // Filter for "favorite" users (users with ID >= 8 for demo)
                const favoriteUsers = usersData.filter(user => user.id >= 8);
                setUsers(favoriteUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div><h2>Loading favorite users...</h2></div>;

    return (
        <div>
            <h2>Favorite Users ⭐</h2>
            <p>These are your favorite users (Demo: Users 8-10):</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                    <li key={user.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ffc107', borderRadius: '5px', backgroundColor: '#fff3cd' }}>
                        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#856404' }}>
                            <h3 style={{ margin: '0' }}>{user.name} ⭐</h3>
                            <small>Added to favorites</small>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
