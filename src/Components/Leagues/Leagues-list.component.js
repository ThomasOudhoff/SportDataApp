import React, { useState, useEffect } from 'react';
import './Leagues-list.component.css';

function LeaguesList({ searchQuery, selectedLeague, onSelectLeague }) {
    // State: lijst van competities
    const [leagues, setLeagues] = useState([]);

    // Haal lijst van competities op bij het laden van de component
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php?s=Soccer');
                const data = await response.json();

                // Filter alleen voetbalcompetities uit de lijst
                const soccerLeagues = data.leagues.filter(league => league.strSport === 'Soccer');
                setLeagues(soccerLeagues);
            } catch (error) {
                console.error("Fout bij ophalen van competities:", error);
            }
        };

        fetchLeagues();
    }, []);

    // Filter competities op basis van de zoekopdracht
    const filteredLeagues = leagues.filter(league =>
        league.strLeague.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ul className="league_wrapper mt-2">
            {/* Toon alle gefilterde competities als klikbare items */}
            {filteredLeagues.map((league) => (
                <li
                    key={league.idLeague}
                    className={`league_item ${selectedLeague?.idLeague === league.idLeague ? 'active' : ''}`}
                    onClick={() => onSelectLeague(league)}
                >
                    {league.strLeague}
                </li>
            ))}
        </ul>
    );
}

export default LeaguesList;

