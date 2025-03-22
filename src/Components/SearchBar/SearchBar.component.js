import React, { useState } from 'react';
import '../SearchBar/SearchBar.component.css';


const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                placeholder="Zoeken..."
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />
            <button type="submit" className="search-button">
                Zoeken
            </button>
        </form>
    );
};

export default SearchBar;
