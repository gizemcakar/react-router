import React from 'react'
import { useParams, Link } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/users" style={{ marginRight: '10px' }}>Back to Users</Link>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
export default UserProfile;
