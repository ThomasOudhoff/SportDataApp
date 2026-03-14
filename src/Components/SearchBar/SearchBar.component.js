import React, { useState } from 'react';
import '../SearchBar/SearchBar.component.css';
import Button from '../ComponentHelpers/Button/Button.component';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSubmit = (e) => {
        e?.preventDefault();
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
            <Button clickButton={() => {}} text="Zoeken" type="submit" />
        </form>
    );
};

export default SearchBar;

