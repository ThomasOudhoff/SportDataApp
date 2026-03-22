import React, { useState } from 'react';
import './Button.component.css';

const Button = ({ clickButton, text, type = "button" }) => {
    const handleClick = (e) => {
        if (type !== "submit") {
            e?.preventDefault();
        }
        clickButton();
    };

    return (
        <button type={type} onClick={handleClick} className="search-button">
            {text}
        </button>
    );
};

export default Button;

//niks aan gedaan

