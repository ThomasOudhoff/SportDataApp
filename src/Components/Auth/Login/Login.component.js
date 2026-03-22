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
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                const { token, email: userEmail } = response.data;
                login(token, userEmail);
                navigate('/');
            }
        } catch (err) {
            setError("Onjuiste gegevens.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="login_window">
            <form onSubmit={handleSubmit}>
                <header>
                    <h2>Inloggen</h2>
                </header>

                {error && <p className="error-message">{error}</p>}

                <section className="input-group">
                    <div className="input-field">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" required disabled={loading} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Wachtwoord:</label>
                        <input type="password" id="password" name="password" required disabled={loading} />
                    </div>
                </section>

                <footer>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Bezig...' : 'Login'}
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