import React, { useState } from 'react';
import './Button.component.css';

const Button = ({ clickButton, text, type = "button" }) => {
    // Wordt uitgevoerd bij het verzenden van het formulier
    const handleClick = (e) => {
        // Alleen preventDefault als het geen submit button is
        if (type !== "submit") {
            e?.preventDefault();
        }
        clickButton();    // Roep de onSearch-functie aan met de ingevulde zoekterm
    };

    return (
        <button type={type} onClick={handleClick} className="search-button">
            {text}
        </button>
    );
};

export default Button;

