import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = ({ children }) => {
    var token = localStorage.getItem('JWT');

    if(token) {
        try {
            const decoded = jwtDecode(token);
            var currentTime = Date.now() / 1000; // Current time in seconds
            if (decoded.exp < currentTime) {
                // Token is expired, redirect to login
                localStorage.removeItem('JWT'); // Optional: remove token from local storage
                return <Navigate to="/auth/login" replace />;
            }
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    }else{
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};
