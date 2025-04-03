import React from 'react';
import './Leagues-list.component.css';

function LeaguesList({ leagues, selectedLeague, onSelectLeague }) {
    return (
        <ul className="league-list">
            {leagues.map((league) => (
                <li
                    key={league.idLeague}
                    className={`league-item ${selectedLeague?.idLeague === league.idLeague ? 'selected' : ''}`}
                    onClick={() => onSelectLeague(league)}
                >
                    {league.strLeague}
                </li>
            ))}
        </ul>
    );
}

export default LeaguesList;