import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            maxWidth: '600px',
            margin: '0 auto'
}}>
            <div style={{
                fontSize: '120px',
                fontWeight: 'bold',
                color: '#dc3545',
                margin: '0',
                lineHeight: '1'
            }}>404 </div>
            
            <h1 style={{
                fontSize: '32px',
                color: '#333',
                margin: '20px 0'
            }}>Page Not Found</h1>
            
            <p style={{
                fontSize: '18px',
                color: '#6c757d',
                margin: '20px 0 40px 0'
            }}>Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            
            <div style={{ marginTop: '20px', color: '#6c757d', marginBottom: '30px' }}>
                <p>Please check the URL and try again.</p>
            </div>
            
            <Link 
                to="/" 
                style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500'
                }}
            >
                🏠 Go Home
            </Link>
        </div>
    );
}
