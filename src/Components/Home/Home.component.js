import React from 'react';
import "./Home.component.css";
import LeaguesList from "../Leagues/Leagues-list.component";
import EventHighlight from "../Events/EventDetails/Event-highlight.component";
import SearchBar from '../SearchBar/SearchBar.component.js';


function HomeComponent() {
    const handleSearch = (query) => {
        console.log("Zoekopdracht:", query);
    };

    return (
        <div className="grid">
            <div className="panel">
                <EventHighlight />
            </div>
            <div className="panel widget-leagues">
                <h2>Leagues</h2>
                <SearchBar onSearch={handleSearch} />
                <LeaguesList />
            </div>
        </div>
    );
}

export default HomeComponent;
