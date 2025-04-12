import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = ({ children }) => {
    // Haal de JWT-token op uit localStorage
    var token = localStorage.getItem('JWT');

    if (token) {
        try {
            // Decodeer de JWT-token om de inhoud (zoals vervaltijd) te lezen
            const decoded = jwtDecode(token);

            // Huidige tijd in seconden
            var currentTime = Date.now() / 1000;

            // Controleer of de token is verlopen
            if (decoded.exp < currentTime) {
                // Token is verlopen → verwijder uit localStorage en stuur gebruiker naar loginpagina
                localStorage.removeItem('JWT');
                return <Navigate to="/auth/login" replace />;
            }
        } catch (error) {
            // Als het decoderen van de token mislukt, toon foutmelding in de console
            console.error('Fout bij decoderen van JWT:', error);
        }
    } else {
        // Geen token aanwezig → stuur gebruiker naar loginpagina
        return <Navigate to="/auth/login" replace />;
    }

    // Als de token geldig is, toon de beveiligde content (children)
    return children;
};

