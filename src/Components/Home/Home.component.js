import React, { useState, useEffect } from 'react';
import "./Home.component.css";
import LeaguesList from "../Leagues/Leagues-list.component";
import SearchBar from '../SearchBar/SearchBar.component';
import LeagueTable from '../Leagues/League-table.component.js';

function HomeComponent() {
    // Lijst met alle competities
    const [leagues, setLeagues] = useState([]);

    // Geselecteerde competitie
    const [selectedLeague, setSelectedLeague] = useState(null);

    // Zoekopdracht uit de zoekbalk
    const [searchQuery, setSearchQuery] = useState("");

    // Haal alle competities op bij het laden van de pagina
    useEffect(() => {
        const fetchLeagues = async () => {
            const res = await fetch("https://api.allorigins.win/raw?url=https://www.thesportsdb.com/api/v1/json/3/all_leagues.php");
            const data = await res.json();
            setLeagues(data.leagues);

            // Selecteer standaard de eerste competitie
            if (data.leagues.length > 0) {
                setSelectedLeague(data.leagues[0]);
            }
        };
        fetchLeagues();
    }, []);

    // Wordt aangeroepen wanneer de gebruiker iets zoekt
    const handleSearch = (query) => {
        console.log("Zoekopdracht:", query);
        setSearchQuery(query);
    };

    return (
        <div className="pageLayout">
            {/* Linkerpaneel met de ranglijst */}
            <div className="leftPanel">
                <div className="scrollableContent">
                    {/* Alleen tonen als er een competitie geselecteerd is */}
                    {selectedLeague && <LeagueTable league={selectedLeague} />}
                </div>
            </div>

            {/* Rechterpaneel met zoekbalk en competitieoverzicht */}
            <div className="rightPanel">
                <h2>Competities</h2>

                {/* Zoekbalk component */}
                <SearchBar onSearch={handleSearch} />

                {/* Lijst met competities */}
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


