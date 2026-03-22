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
        const password = e.target.password.value;
        const email = e.target.email.value;
        const confirmEmail = e.target.confirmEmail.value;

        if (email !== confirmEmail) {
            setError("E-mailadressen komen niet overeen.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/users',
                {
                    username,
                    email,
                    password,
                    role: ["user"]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'novi-education-project-id': 'e9857dea-c29c-44bc-8429-8451091f8df7'
                    }
                }
            );

            if (response.status === 201 || response.status === 200) {
                try {
                    const loginResponse = await axios.post(
                        'https://novi-backend-api-wgsgz.ondigitalocean.app/api/login',
                        { email, password },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'novi-education-project-id': 'e9857dea-c29c-44bc-8429-8451091f8df7'
                            }
                        }
                    );

                    if (loginResponse.status === 200) {
                        login(loginResponse.data.token, loginResponse.data.user.email);
                        navigate("/");
                    }
                } catch (loginErr) {
                    navigate("/auth/login");
                }
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError("E-mailadres of gebruikersnaam is al in gebruik.");
            } else if (err.response && err.response.status === 400) {
                setError("Ongeldige gegevens. Controleer of je wachtwoord lang genoeg is.");
            } else {
                setError("Registratie mislukt. Probeer het later opnieuw.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="login_window">
            <form onSubmit={handleRegister} className="search-form">
                <header>
                    <h2>Registreren</h2>
                </header>

                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

                <section>
                    <div>
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmEmail">Bevestig E-mail:</label>
                        <input
                            type="email"
                            id="confirmEmail"
                            name="confirmEmail"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Wachtwoord:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            disabled={loading}
                        />
                    </div>
                </section>

                <footer>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Account aanmaken...' : 'Account aanmaken'}
                    </button>
                </footer>
            </form>

            <nav className="register-link">
                <p>Heb je al een account?</p>
                <button
                    type="button"
                    onClick={() => navigate("/auth/login")}
                    disabled={loading}
                >
                    Terug naar login
                </button>
            </nav>
        </article>
    );
};

export default Register;