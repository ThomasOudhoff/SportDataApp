import React, { useState } from 'react';
import '../SearchBar/SearchBar.component.css';
import Button from '../ComponentHelpers/Button/Button.component';

const SearchBar = ({ onSearch }) => {
    // State om de zoekopdracht (inputveld) bij te houden
    const [query, setQuery] = useState('');

    // Wordt uitgevoerd bij iedere wijziging in het inputveld
    const handleInputChange = (e) => {
        setQuery(e.target.value); // Update de query-state met de huidige invoer
    };

    // Wordt uitgevoerd bij het verzenden van het formulier
    const handleSubmit = (e) => {
        e?.preventDefault(); // Voorkom dat de pagina herlaadt
        onSearch(query);    // Roep de onSearch-functie aan met de ingevulde zoekterm
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            {/* Invoerveld voor zoekopdracht */}
            <input
                type="text"
                placeholder="Zoeken..."
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />

            {/* Knop om zoekopdracht uit te voeren */}
            <Button clickButton={() => {}} text="Zoeken" type="submit" />
        </form>
    );
};

export default SearchBar;

