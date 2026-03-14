import './Login.component.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';
import React, { useState } from 'react';
import Button from '../../ComponentHelpers/Button/Button.component';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        const baseUrl = 'https://api.datavortex.nl/sportdataapp';

        try {
            const response = await fetch(`${baseUrl}/users/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.REACT_APP_API_KEY
                },
                body: JSON.stringify({ username, password }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (err) {}

            if (response.ok) {
                login(data.jwt);
                navigate('/');
            } else if (response.status === 401 || response.status === 403) {
                setError("Gebruikersnaam of wachtwoord is onjuist.");
            } else {
                setError(data.message || "Er is iets misgegaan. Probeer het opnieuw.");
            }
        } catch (error) {
            setError("Fout bij verbinden met de server. Probeer het later opnieuw.");
        }
    };

    return (
        <div className="login_window">
            {error && <p className="text-red">{error}</p>}
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
            <div className="register-link">
                <p>Nog geen account?</p>
                <button type="button" onClick={() => navigate('/auth/register')}>
                    Registreren
                </button>
            </div>
        </div>
    );
};

export default Login;


