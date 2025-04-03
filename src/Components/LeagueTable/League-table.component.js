import React, { useEffect, useState } from 'react';
import './League-table.component.css';

function LeagueTable({ league }) {
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchTable = async () => {
            const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${league.idLeague}&s=2022-2023`);
            const data = await res.json();
            setStandings(data.table || []);
        };

        if (league) {
            fetchTable();
        }
    }, [league]);

    return (
        <div>
            <h2>{league.strLeague} - Stand</h2>
            {standings.length > 0 ? (
                <table className="league-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>Gespeeld</th>
                        <th>Punten</th>
                    </tr>
                    </thead>
                    <tbody>
                    {standings.map((team) => (
                        <tr key={team.teamid}>
                            <td>{team.intRank}</td>
                            <td>{team.name}</td>
                            <td>{team.played}</td>
                            <td>{team.total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Geen standen beschikbaar.</p>
            )}
        </div>
    );
}

export default LeagueTable;
