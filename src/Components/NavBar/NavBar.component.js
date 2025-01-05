import React from 'react';
import "./NavBar.component.css";

export function NavBarComponent() {
    return (
        <div className="navbar">
            <ul>
                <li>
                    Home
                </li>
                <li>
                    Teams
                </li>
                <li>
                    Scores
                </li>
                <li>
                    Login
                </li>
            </ul>
        </div>

    )
}
export default NavBarComponent;