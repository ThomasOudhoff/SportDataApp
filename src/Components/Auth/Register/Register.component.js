import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(e);
        const username = e.target.username.value;
        const password = e.target.password.value;
        const info = "testinfo"
        const email = e.target.email.value;
        const confirmEmail = e.target.confirmEmail.value;

        if (email !== confirmEmail) {
            setError("E-mailadressen komen niet overeen.");
            return;
        }
        try {
            const response = await fetch('https://api.datavortex.nl/sportdataapp/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'sportdataapp:2gCMFn7OsqAAY15nbACY'
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
                navigate("/auth/login"); // Redirect naar login pagina
            } else {
                if (response.status == 409) {
                    setError("E-mail of gebruiksnaam is al in gebruik")
                }
                else {
                    setError("Registratie mislukt. Probeer het opnieuw.");
                }
            }

        } catch (err) {
            console.error("Error tijdens registratie:", err);
            setError("Er ging iets mis. Probeer later opnieuw.");
        }
    };

    return (
        <div className="login_window">
            <form onSubmit={handleRegister} className="search-form">
                <h2>Registreren</h2>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <div>
                    <label htmlFor="username">Gebruikersnaam:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label htmlFor="confirmEmail">Bevestig E-mail:</label>
                    <input type="email" id="confirmEmail" name="confirmEmail" required/>
                </div>
                <div>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Account aanmaken</button>
            </form>
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
