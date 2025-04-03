import React, { useState, useEffect } from 'react';
import "./Home.component.css";
import LeaguesList from "../Leagues/Leagues-list.component";
import EventHighlight from "../Events/EventDetails/Event-highlight.component";
import SearchBar from '../SearchBar/SearchBar.component';
import LeagueTable from '../LeagueTable/League-table.component.js';

function HomeComponent() {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);

    useEffect(() => {
        const fetchLeagues = async () => {
            const res = await fetch("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php");
            const data = await res.json();
            setLeagues(data.leagues);
            if (data.leagues.length > 0) {
                setSelectedLeague(data.leagues[0]);
            }
        };
        fetchLeagues();
    }, []);

    const handleSearch = (query) => {
        console.log("Zoekopdracht:", query);
    };

    return (
        <div className="grid">
            <div className="panel">
                {selectedLeague && <LeagueTable league={selectedLeague} />}
            </div>
            <div className="panel widget-leagues">
                <h2>Competities</h2>
                <SearchBar onSearch={handleSearch} />
                <LeaguesList
                    leagues={leagues}
                    selectedLeague={selectedLeague}
                    onSelectLeague={setSelectedLeague}
                />
            </div>
        </div>
    );
}

export default HomeComponent;

