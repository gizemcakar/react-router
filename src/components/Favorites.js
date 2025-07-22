import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = () => {
            // Get favorites from localStorage instead of API
            const storedFavorites = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
            setFavorites(storedFavorites);
            setLoading(false);
        };

        loadFavorites();

        // Listen for storage changes to update favorites in real-time
        const handleStorageChange = () => {
            loadFavorites();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('favoritesUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('favoritesUpdated', handleStorageChange);
        };
    }, []);

    const removeFromFavorites = (userId) => {
        const newFavorites = favorites.filter(user => user.id !== userId);
        localStorage.setItem('favoriteUsers', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    if (loading) return <div><h2>Loading favorite users...</h2></div>;

    if (favorites.length === 0) {
        return (
            <div>
                <h2>Favorite Users ⭐</h2>
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                }}>
                    <p style={{ fontSize: '18px', color: '#6c757d', margin: '0 0 20px 0' }}>
                        🤍 No favorite users yet
                    </p>
                    <p style={{ color: '#6c757d', margin: '0 0 20px 0' }}>
                        Visit user profiles and click "Add to Favorites" to save them here.
                    </p>
                    <Link 
                        to="/users" 
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        Browse Users
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Favorite Users ⭐ ({favorites.length})</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {favorites.map(user => (
                    <li key={user.id} style={{ 
                        marginBottom: '15px', 
                        padding: '15px', 
                        border: '1px solid #ffc107', 
                        borderRadius: '8px', 
                        backgroundColor: '#fff3cd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#856404' }}>
                                <h3 style={{ margin: '0 0 5px 0' }}>{user.name} ⭐</h3>
                                <small>@{user.username} • {user.email}</small>
                            </Link>
                        </div>
                        <button 
                            onClick={() => removeFromFavorites(user.id)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
