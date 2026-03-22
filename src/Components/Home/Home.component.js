import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./Home.component.css";
import LeaguesList from "../Leagues/Leagues-list.component.js";
import SearchBar from '../SearchBar/SearchBar.component.js';
import LeagueTable from '../Leagues/League-table.component.js';

function HomeComponent() {
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isFetching = useRef(false);

    useEffect(() => {
        const fetchLeagues = async () => {
            if (isFetching.current || leagues.length > 0) return;

            isFetching.current = true;
            setLoading(true);
            try {
                const response = await axios.get("https://www.thesportsdb.com/api/v1/json/3/all_leagues.php");

                if (response.data && response.data.leagues) {
                    const soccerLeagues = response.data.leagues.filter(league =>
                        league.strSport === "Soccer"
                    );
                    setLeagues(soccerLeagues);
                    if (soccerLeagues.length > 0 && !selectedLeague) {
                        setSelectedLeague(soccerLeagues[0]);
                    }
                }
            } catch (err) {
                if (err.response && err.response.status === 429) {
                    setError("API limiet bereikt. Probeer het over een minuutje weer.");
                } else {
                    setError("Er ging iets mis bij het ophalen van de competities.");
                }
            } finally {
                setLoading(false);
                isFetching.current = false;
            }
        };
        fetchLeagues();
    }, [leagues.length, selectedLeague]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    return (
        <main className="pageLayout">
            <section className="leftPanel">
                <div className="scrollableContent">
                    {selectedLeague && <LeagueTable league={selectedLeague} />}
                </div>
            </section>

            <section className="rightPanel">
                <header>
                    <h2>Competities</h2>
                </header>

                <SearchBar onSearch={handleSearch} />

                {loading && <p>Laden...</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="scrollableContent">
                    <LeaguesList
                        searchQuery={searchQuery}
                        leagues={leagues}
                        selectedLeague={selectedLeague}
                        onSelectLeague={setSelectedLeague}
                    />
                </div>
            </section>
        </main>
    );
}

export default HomeComponent;

