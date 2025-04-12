import React, { useState, useEffect } from "react";
import "./NavBar.component.css";
import { Link, useNavigate } from "react-router-dom";

const NavBarComponent = () => {
    // State voor het weergeven van de huidige datum en tijd
    const [dateTime, setDateTime] = useState("");

    // React Router hook om te kunnen navigeren
    const navigate = useNavigate();

    // Controleer of gebruiker is ingelogd aan de hand van de JWT in localStorage
    const isAuthenticated = !!localStorage.getItem("JWT");

    // Uitlogfunctie: verwijdert JWT en stuurt gebruiker naar loginpagina
    const handleLogout = () => {
        localStorage.removeItem("JWT");
        navigate("/auth/login");
    };

    // Effect: update de datum en tijd elke minuut
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            // Format de datum en tijd in Nederlands formaat
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const date = now.toLocaleDateString("nl-NL", options);
            const time = now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

            setDateTime(`${date} - ${time}`);
        };

        updateDateTime(); // Zet meteen de eerste waarde

        // Update elke 60 seconden
        const intervalId = setInterval(updateDateTime, 60000);

        // Opruimen van interval bij het verlaten van de component
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="navbar">
            {/* Linkerkant van de navigatiebalk: huidige datum en tijd */}
            <div className="datetime">{dateTime}</div>

            {/* Rechterkant: navigatielinks */}
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/favorites">My Teams</Link>

                {/* Toon 'Login' als gebruiker niet is ingelogd, anders 'Log uit' */}
                {!isAuthenticated ? (
                    <Link to="/auth/login">Login</Link>
                ) : (
                    <span className="logout-link" onClick={handleLogout}>
                        Log uit
                    </span>
                )}
            </div>
        </div>
    );
};

export default NavBarComponent;


