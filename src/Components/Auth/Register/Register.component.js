import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';

const Register = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const info = "testinfo";
        const email = e.target.email.value;
        const confirmEmail = e.target.confirmEmail.value;

        if (email !== confirmEmail) {
            setError("E-mailadressen komen niet overeen.");
            return;
        }

        const baseUrl = 'https://api.datavortex.nl/sportdataapp';

        try {
            const response = await fetch(`${baseUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.REACT_APP_API_KEY
                },
                body: JSON.stringify({ username, email, password, info }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (jsonErr) {}

            if (response.ok) {
                login(data.jwt);
                navigate("/");
            } else if (response.status === 409) {
                setError("E-mailadres of gebruikersnaam is al in gebruik.");
            } else {
                setError(data.message || "Registratie mislukt. Probeer het opnieuw.");
            }
        } catch (err) {
            setError("Fout bij verbinden met de server. Probeer het later opnieuw.");
        }
    };

    return (
        <div className="login_window">
            <form onSubmit={handleRegister} className="search-form">
                <h2>Registreren</h2>
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
            <div className="register-link">
                <p>Heb je al een account?</p>
                <button type="button" onClick={() => navigate("/auth/login")}>Terug naar login</button>
            </div>
        </div>
    );
};

export default Register;