import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('JWT');

    // Check of token bestaat en grofweg juist opgebouwd is (3 delen)
    if (!token || token.split('.').length !== 3) {
        console.warn('Geen geldig JWT-token gevonden.');
        return <Navigate to="/auth/login" />;
    }

    try {
        const decoded = jwtDecode(token);
        // (optioneel) controleer vervaldatum of andere claims hier
        return children; // gebruiker mag door
    } catch (error) {
        console.error('Fout bij decoderen van JWT:', error);
        return <Navigate to="/auth/login" />;
    }
};

export default ProtectedRoute;
