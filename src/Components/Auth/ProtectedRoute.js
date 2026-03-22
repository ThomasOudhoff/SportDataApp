import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, status } = useAuth();

    if (status === 'pending') {
        return (
            <article>
                <p>Authenticatie controleren...</p>
            </article>
        );
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;