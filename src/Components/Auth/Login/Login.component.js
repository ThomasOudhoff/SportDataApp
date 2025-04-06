import React from 'react';
import './Login.component.css';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        // Simuleer een loginactie
        console.log('Inloggen met:', username, password);

        try {
            const response = await fetch('https://api.datavortex.nl/sportdataapp/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    'username': username, 
                    'password': password 
                }),
            });
            const data = await response.json();

            console.log('Response:', data);
            if (response.ok) {
                // Opslaan van de token in localStorage
                localStorage.setItem('JWT', data.jwt);
                console.log('Inloggen geslaagd!');
                // Hier kun je de gebruiker doorverwijzen naar een andere pagina of een succesbericht weergeven
                if (response.ok) {
                    localStorage.setItem('JWT', data.jwt);
                    console.log('Inloggen geslaagd!');
                    navigate("/"); // ⬅️ Ga naar home
                }
            } else {
                console.error('Inloggen mislukt:', data.message);
                // Hier kun je een foutmelding weergeven aan de gebruiker
            }
        } catch (error) {
            console.error("Error authenticating:", error);
        }
    };

    return (
        <div className="login_window">
            <form onSubmit={handleSubmit} className="search-form">
                <div>
                    {localStorage.getItem("JWT")}
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="username" id="username" name="username" required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Login</button>
            </form>
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
