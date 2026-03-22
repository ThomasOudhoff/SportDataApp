import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';

const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmEmail = e.target.confirmEmail.value;

        if (email !== confirmEmail) {
            setError("E-mailadressen komen niet overeen.");
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/users',
                {
                    username,
                    email,
                    password,
                    role: ["user"]
                },
                {
                    headers: {
                        'novi-education-project-id': 'e9857dea-c29c-44bc-8429-8451091f8df7',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const loginRes = await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/login',
                { email, password },
                {
                    headers: {
                        'novi-education-project-id': 'e9857dea-c29c-44bc-8429-8451091f8df7',
                        'Content-Type': 'application/json'
                    }
                }
            );

            const token = loginRes.data.token || loginRes.data.accessToken;
            const userEmail = loginRes.data.email;
            const userId = loginRes.data.id !== undefined ? loginRes.data.id : 0;

            login(token, userEmail, userId);
            navigate("/");
        } catch (err) {
            setError("Registratie mislukt.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="login_window">
            <form onSubmit={handleRegister} className="login-form">
                <header>
                    <h2>Registreren</h2>
                </header>

                {error && <p className="error-message">{error}</p>}

                <section className="input-group">
                    <div className="input-field">
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input type="text" id="username" name="username" required disabled={loading} autoComplete="username" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" required disabled={loading} autoComplete="email" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="confirmEmail">Bevestig E-mail:</label>
                        <input type="email" id="confirmEmail" name="confirmEmail" required disabled={loading} autoComplete="email" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Wachtwoord:</label>
                        <input type="password" id="password" name="password" required disabled={loading} autoComplete="new-password" />
                    </div>
                </section>

                <footer>
                    <button type="submit" className="main-button" disabled={loading}>
                        Account aanmaken
                    </button>
                </footer>
            </form>

            <nav className="register-link">
                <p>Heb je al een account?</p>
                <button
                    type="button"
                    className="secondary-button"
                    onClick={() => navigate("/auth/login")}
                >
                    Terug naar login
                </button>
            </nav>
        </article>
    );
};

export default Register;