import React, { useState, useEffect } from 'react';
import './Leagues-list.component.css';

function LeaguesList({ searchQuery, selectedLeague, onSelectLeague }) {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await fetch('/api/v1/json/3/all_leagues.php?s=Soccer');
                const data = await response.json();

                const soccerLeagues = data.leagues.filter(league => league.strSport === 'Soccer');
                setLeagues(soccerLeagues);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLeagues();
    }, []);

    const filteredLeagues = leagues.filter(league =>
        league.strLeague.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ul className="league_wrapper mt-2">
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

