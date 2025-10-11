import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';

const Register = () => {
    const [error, setError] = useState(''); // State om foutmeldingen te tonen
    const navigate = useNavigate(); // Hook om te navigeren naar andere routes
    const { login } = useAuth(); // Haalt de login functie uit de context

    // Wordt uitgevoerd bij het verzenden van het registratieformulier
    const handleRegister = async (e) => {
        e.preventDefault();

        // Haal de formulierwaarden op
        const username = e.target.username.value;
        const password = e.target.password.value;
        const info = "testinfo"; // Extra info, hier hardcoded
        const email = e.target.email.value;
        const confirmEmail = e.target.confirmEmail.value;

        // Controleer of de e-mailvelden overeenkomen
        if (email !== confirmEmail) {
            setError("E-mailadressen komen niet overeen.");
            return;
        }

        try {
            // Verstuur de registratiegegevens naar de API
            const response = await fetch('https://api.datavortex.nl/sportdataapp/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                body: JSON.stringify({ username, email, password, info }),
            });

            // Probeer de JSON te parsen (werkt mogelijk niet bij foutstatus)
            let data = {};
            try {
                data = await response.json();
            } catch (jsonErr) {
                console.warn('Response is geen geldige JSON:', jsonErr);
            }

            // Als registratie succesvol is
            if (response.ok) {
                console.log("Registratie geslaagd!");
                login(data.jwt); // Automatisch inloggen na registratie
                navigate("/"); // Ga naar de homepage
            }
            // Als e-mail of gebruikersnaam al bestaat (409 status)
            else if (response.status === 409) {
                setError("E-mailadres of gebruikersnaam is al in gebruik.");
            }
            // Andere foutstatus van de server
            else {
                setError(data.message || "Registratie mislukt. Probeer het opnieuw.");
            }

        } catch (err) {
            // Fout bij netwerkverzoek of server niet bereikbaar
            console.error("Error tijdens registratie:", err);
            setError("Fout bij verbinden met de server. Probeer het later opnieuw.");
        }
    };

    return (
        <div className="login_window">
            {/* Registratieformulier */}
            <form onSubmit={handleRegister} className="search-form">
                <h2>Registreren</h2>

                {/* Toon foutmelding indien aanwezig */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div>
                    <label htmlFor="username">Gebruikersnaam:</label>
                    <input type="text" id="username" name="username" required />
                </div>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div>
                    <label htmlFor="confirmEmail">Bevestig E-mail:</label>
                    <input type="email" id="confirmEmail" name="confirmEmail" required />
                </div>

                <div>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input type="password" id="password" name="password" required />
                </div>

                <button type="submit">Account aanmaken</button>
            </form>

            {/* Link terug naar loginpagina */}
            <div className="register-link">
                <p>Heb je al een account?</p>
                <button type="button" onClick={() => navigate("/auth/login")}>Terug naar login</button>
            </div>
        </div>
    );
};

export default Register;


