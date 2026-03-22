import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';
import './Login.component.css';

function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post(
                'https://novi-backend-api-wgsgz.ondigitalocean.app/api/login',
                { email, password },
                {
                    headers: {
                        "novi-education-project-id": 'e9857dea-c29c-44bc-8429-8451091f8df7',
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                const { token, user } = response.data;
                login(token, user.email);
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Onjuiste inloggegevens. Controleer je e-mail en wachtwoord.");
            } else if (err.response && err.response.status === 429) {
                setError("Te veel inlogpogingen. Probeer het over een minuutje opnieuw.");
            } else {
                setError("Fout bij verbinden met de server. Probeer het later nog eens.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="login_window">
            <form onSubmit={handleSubmit} className="search-form">
                <header>
                    <h2>Inloggen</h2>
                </header>

                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

                <section>
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
                        {loading ? 'Bezig met inloggen...' : 'Login'}
                    </button>
                </footer>
            </form>

            <nav className="register-link">
                <p>Nog geen account?</p>
                <button
                    type="button"
                    onClick={() => navigate("/auth/register")}
                    disabled={loading}
                >
                    Registreren
                </button>
            </nav>
        </article>
    );
}

export default Login;