import './Login.component.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';
import React, { useState } from 'react';
import Button from '../../ComponentHelpers/Button/Button.component';

const Login = () => {
    const navigate = useNavigate(); // Voor navigatie naar andere pagina's
    const { login } = useAuth(); // Haal de login-functie uit de context
    const [error, setError] = useState(''); // Voor het tonen van foutmeldingen

    // Wordt uitgevoerd bij het indienen van het formulier
    const handleSubmit = async (e) => {
        e.preventDefault(); // Voorkom dat de pagina herlaadt
        
        const username = e.target.username.value; // Haal gebruikersnaam op
        const password = e.target.password.value; // Haal wachtwoord op

        console.log('Inloggen met:', username, password);

        try {
            // Verstuur POST-request naar de login-API
            const response = await fetch('https://api.datavortex.nl/sportdataapp/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (err) {
                console.warn('Response is geen geldige JSON:', err);
            }

            console.log('Statuscode:', response.status);

            if (response.ok) {
                login(data.jwt);
                navigate('/');
            } else if (response.status === 401 || response.status === 403) {
                setError("Gebruikersnaam of wachtwoord is onjuist.");
            } else {
                setError(data.message || "Er is iets misgegaan. Probeer het opnieuw.");
            }

        } catch (error) {
            // Bij netwerkfout of andere error
            console.error("Fout bij inloggen:", error);
            setError("Fout bij verbinden met de server. Probeer het later opnieuw.");
        }
    };

    return (
        <div className="login_window">
            {/* Foutmelding tonen indien aanwezig */}
            {error && <p className="text-red">{error}</p>}

            {/* Inlogformulier */}
            <form className="search-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <Button clickButton={() => {}} text="Login" type="submit" />
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


