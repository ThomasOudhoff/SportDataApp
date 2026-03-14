import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('JWT');

    if (!token || token.split('.').length !== 3) {
        return <Navigate to="/auth/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
            localStorage.removeItem('JWT');
            return <Navigate to="/auth/login" replace />;
        }

        return children;
    } catch (error) {
        localStorage.removeItem('JWT');
        return <Navigate to="/auth/login" replace />;
    }
};

export default ProtectedRoute;;
