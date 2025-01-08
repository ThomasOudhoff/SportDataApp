import React, { useState, useEffect } from "react";
import "./NavBar.component.css";

const NavBarComponent = () => {
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const date = now.toLocaleDateString("nl-NL", options);
            const time = now.getHours() + ":" + now.getMinutes();
            setDateTime(`${date} - ${time}`);
        };

        updateDateTime(); // Initialiseer datum en tijd
        const intervalId = setInterval(updateDateTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="navbar">
            {/* Linkerzijde: Datum en Tijd */}
            <div className="datetime">{dateTime}</div>

            {/* Rechterzijde: Navigatielinks */}
            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#teams">Teams</a>
                <a href="#scores">Scores</a>
                <a href="#login">Login</a>
            </div>
        </div>
    );
};

export default NavBarComponent;
