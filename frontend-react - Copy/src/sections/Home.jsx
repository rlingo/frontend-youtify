import React, { useEffect } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';

const LOGOUT_URL  = '/api/logout'
const LOGIN_URL = '/api/user'

function Home() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            // Send the logout request
            const response = await axios.post(
                LOGOUT_URL,
                {},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
    
            // Check if the response status is 401
            if (response.status === 401) {
                // Handle the 401 status code (optional)
                console.warn('Received 401 status code during logout');
            }
    
            // Navigate to the login page
            navigate('/login');
        } catch (error) {
            // Handle any errors
            console.error('Error occurred during logout:', error);
        }
    };
    


    useEffect(() => {
        (
            async () => {
                const response = await axios.get(LOGIN_URL,
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    });
            }
        )();
    });

  return (
    <div>
        <div className="mb-2">
            <h1 className="mb-4 text center">Start Listening</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    </div>
    
  )
}

export default Home