import React, { useState, useEffect } from 'react';
import "./Home.component.css";
import LeaguesList from "../Leagues/Leagues-list.component";
import EventHighlight from "../Events/EventDetails/Event-highlight.component";
import SearchBar from '../SearchBar/SearchBar.component';
import LeagueTable from '../Leagues/League-table.component.js';

function HomeComponent() {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");

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
        setSearchQuery(query);
    };
    return (
        <div className="pageLayout">
            <div className="leftPanel">
                <div className="scrollableContent">
                    {selectedLeague && <LeagueTable league={selectedLeague} />}
                </div>
            </div>

            <div className="rightPanel">
                <h2>Competities</h2>
                <SearchBar onSearch={handleSearch} />
                <div className="scrollableContent">
                    <LeaguesList
                        searchQuery={searchQuery}
                        selectedLeague={selectedLeague}
                        onSelectLeague={setSelectedLeague}
                    />
                </div>
            </div>
        </div>
    );

}

export default HomeComponent;

