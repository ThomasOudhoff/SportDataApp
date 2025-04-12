import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState(''); // State voor foutmeldingen
    const navigate = useNavigate(); // Hook voor navigatie

    // Wordt uitgevoerd bij verzenden van het registratieformulier
    const handleRegister = async (e) => {
        e.preventDefault(); // Voorkom standaard formulieractie (pagina herladen)

        // Haal formulierwaarden op
        const username = e.target.username.value;
        const password = e.target.password.value;
        const info = "testinfo"; // Extra info (placeholder)
        const email = e.target.email.value;
        const confirmEmail = e.target.confirmEmail.value;

        // Check of e-mail en bevestiging overeenkomen
        if (email !== confirmEmail) {
            setError("E-mailadressen komen niet overeen.");
            return;
        }

        try {
            // Verstuur registratiegegevens naar de API
            const response = await fetch('https://api.datavortex.nl/sportdataapp/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.REACT_APP_API_KEY // API-key uit .env bestand
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    info
                }),
            });

            if (response.ok) {
                console.log("Registratie geslaagd!");
                // Stuur gebruiker door naar loginpagina
                navigate("/auth/login");
            } else {
                // Specifieke fout: e-mail of gebruikersnaam al in gebruik
                if (response.status === 409) {
                    setError("E-mail of gebruiksnaam is al in gebruik");
                } else {
                    // Algemene foutmelding
                    setError("Registratie mislukt. Probeer het opnieuw.");
                }
            }

        } catch (err) {
            // Fout tijdens netwerkverzoek of fetch
            console.error("Error tijdens registratie:", err);
            setError("Er ging iets mis. Probeer later opnieuw.");
        }
    };

    return (
        <div className="login_window">
            {/* Registratieformulier */}
            <form onSubmit={handleRegister} className="search-form">
                <h2>Registreren</h2>

                {/* Toon foutmelding indien aanwezig */}
                {error && <p style={{color: 'red'}}>{error}</p>}

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

            {/* Link terug naar login */}
            <div className="register-link">
                <p>Heb je al een account?</p>
                <button type="button" onClick={() => navigate("/auth/login")}>
                    Terug naar login
                </button>
            </div>
        </div>
    );
};

export default Register;

