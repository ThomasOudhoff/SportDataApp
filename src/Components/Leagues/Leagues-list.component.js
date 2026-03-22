import React from 'react';
import './Leagues-list.component.css';

function LeaguesList({ searchQuery, leagues, selectedLeague, onSelectLeague }) {
    const filteredLeagues = (leagues || []).filter(league =>
        league.strLeague.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredLeagues.length === 0) {
        return <p className="no-results">Geen competities gevonden.</p>;
    }

    return (
        <ul className="league_wrapper">
            {filteredLeagues.map((league) => (
                <li key={league.idLeague}>
                    <button
                        type="button"
                        className={`league_item ${selectedLeague?.idLeague === league.idLeague ? 'active' : ''}`}
                        onClick={() => onSelectLeague(league)}
                    >
                        {league.strLeague}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default LeaguesList;