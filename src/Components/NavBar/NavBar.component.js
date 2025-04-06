import React, { useState, useEffect } from "react";
import "./NavBar.component.css";
import {Link} from "react-router-dom";

const NavBarComponent = () => {
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const date = now.toLocaleDateString("nl-NL", options);
            const time = now.getHours() + ":" + (now.getMinutes().toString().padStart(2, "0"));
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
                <Link to="/">Home</Link>
                <Link to="/teams">My Teams</Link>
                <Link to="/auth/login">Login</Link>
            </div>
        </div>
    );
};

export default NavBarComponent;
