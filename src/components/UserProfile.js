import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Check if user is already in favorites
  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
  }, [id]);

  // Navigation functions
    const goToNextUser = () => {
        const currentId = parseInt(id);
        const nextId = currentId >= 10 ? 1 : currentId + 1; // Loop back to 1 after user 10
        navigate(`/users/${nextId}`);
    };

    const goToPreviousUser = () => {
        const currentId = parseInt(id);
        const prevId = currentId <= 1 ? 10 : currentId - 1; // Loop to 10 from user 1
        navigate(`/users/${prevId}`);
    };
    const removeFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
    const newFavorites = favorites.filter(fav => fav.id !== user.id);
    localStorage.setItem('favoriteUsers', JSON.stringify(newFavorites));
    setIsFavorite(false);
  };

  // Favorite functions
  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
    
    if (!favorites.some(fav => fav.id === user.id)) {
      const newFavorites = [...favorites, user];
      localStorage.setItem('favoriteUsers', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
        <p>Fetching user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>User ID: {id} does not exist</p>
        <p>{error}</p>
        <Link to="/users">Back to Users</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>{user.name}</h2>
        <p><strong>Username:</strong> @{user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company?.name}</p>
        <p><strong>Address:</strong> {user.address?.street}, {user.address?.city}</p>
  
       {/* Favorite Button */}
        <div style={{ marginTop: '15px' }}>
          {isFavorite ? (
            <button 
              onClick={removeFromFavorites}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ❤️ Remove from Favorites
            </button>
          ) : (
            <button 
              onClick={addToFavorites}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🤍 Add to Favorites
            </button>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px'
      }}>
        <button 
          onClick={goToPreviousUser}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Previous User
        </button>
        
        <button 
          onClick={goToNextUser}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Next User →
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/users" style={{ marginRight: '10px' }}>Back to Users</Link>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
export default UserProfile;
