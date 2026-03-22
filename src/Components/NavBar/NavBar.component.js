import React, { useState, useEffect } from "react";
import "./NavBar.component.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const NavBarComponent = () => {
    const [dateTime, setDateTime] = useState("");
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/auth/login");
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const date = now.toLocaleDateString("nl-NL", options);
            const time = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
            setDateTime(`${date} - ${time}`);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <nav className="navbar">
            <div className="datetime">
                <time>{dateTime}</time>
            </div>
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
                    Home
                </NavLink>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? "active-link" : ""}>
                    My Teams
                </NavLink>
                {!user ? (
                    <NavLink to="/auth/login" className={({ isActive }) => isActive ? "active-link" : ""}>
                        Login
                    </NavLink>
                ) : (
                    <button type="button" className="logout-button" onClick={handleLogout}>
                        Log uit
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBarComponent;

