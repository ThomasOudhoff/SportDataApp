import React, { useState, useEffect } from 'react';
import "./Home.component.css";
import LeaguesList from "../Leagues/Leagues-list.component.js";
import SearchBar from '../SearchBar/SearchBar.component.js';
import LeagueTable from '../Leagues/League-table.component.js';

function HomeComponent() {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const res = await fetch("/api/v1/json/3/all_leagues.php");
                const data = await res.json();

                if (data.leagues) {
                    const soccerLeagues = data.leagues.filter(league =>
                        league.strSport === "Soccer"
                    );
                    setLeagues(soccerLeagues);
                    if (soccerLeagues.length > 0) {
                        setSelectedLeague(soccerLeagues[0]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchLeagues();
    }, []);

    const handleSearch = (query) => {
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
                        leagues={leagues}
                        selectedLeague={selectedLeague}
                        onSelectLeague={setSelectedLeague}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;

