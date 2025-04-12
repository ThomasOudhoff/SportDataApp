import React from 'react';
import './Login.component.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    // React Router hook om te kunnen navigeren
    const navigate = useNavigate();

    // Functie die wordt uitgevoerd wanneer het formulier wordt verzonden
    const handleSubmit = async(e) => {
        e.preventDefault(); // Voorkom standaard formuliergedrag (pagina herladen)

        // Haal gebruikersnaam en wachtwoord op uit de formulierinvoer
        const username = e.target.username.value;
        const password = e.target.password.value;

        // Toon de ingevoerde gegevens in de console (voor debug)
        console.log('Inloggen met:', username, password);

        try {
            // Verstuur inloggegevens naar de API
            const response = await fetch('https://api.datavortex.nl/sportdataapp/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
                }),
            });

            // Ontvang antwoord van de server
            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                // Als inloggen gelukt is, sla de JWT-token op in localStorage
                localStorage.setItem('JWT', data.jwt);
                console.log('Inloggen geslaagd!');

                // Navigeer naar de homepage
                navigate("/");
            } else {
                // Als de server een fout teruggeeft, toon een foutmelding in de console
                console.error('Inloggen mislukt:', data.message);
                // (Optioneel) toon fout aan gebruiker
            }

        } catch (error) {
            // Fout bij het uitvoeren van de fetch-aanroep
            console.error("Fout bij inloggen:", error);
        }
    };

    return (
        <div className="login_window">
            {/* Inlogformulier */}
            <form onSubmit={handleSubmit} className="search-form">

                {/* (Optioneel) toon de huidige JWT uit localStorage */}
                <div>
                    {localStorage.getItem("JWT")}
                </div>

                {/* Gebruikersnaamveld */}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="username" id="username" name="username" required />
                </div>

                {/* Wachtwoordveld */}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>

                {/* Inlogknop */}
                <button type="submit">Login</button>
            </form>

            {/* Link naar registratiepagina */}
            <div className="register-link">
                <p>Nog geen account?</p>
                <button type="button" onClick={() => window.location.href = '/auth/register'}>
                    Registreren
                </button>
            </div>
        </div>
    );
};

export default Login;

