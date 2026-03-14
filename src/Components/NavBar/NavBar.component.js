import React, { useState, useEffect } from "react";
import "./NavBar.component.css";
import { Link, useNavigate } from "react-router-dom";

const NavBarComponent = () => {
    const [dateTime, setDateTime] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("JWT");
    const handleLogout = () => {
        localStorage.removeItem("JWT");
        navigate("/auth/login");
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const date = now.toLocaleDateString("nl-NL", options);
            const time = now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

            setDateTime(`${date} - ${time}`);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="navbar">
            <div className="datetime">{dateTime}</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/favorites">My Teams</Link>
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


