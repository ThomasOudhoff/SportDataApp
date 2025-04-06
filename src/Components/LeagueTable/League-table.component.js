import React, { useEffect, useState } from 'react';
import './League-table.component.css';

function LeagueTable({ league }) {
    const [standings, setStandings] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState("2020-2021");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTable = async () => {
            if (!league || !league.idLeague) return;

            setLoading(true);
            try {
                const res = await fetch(
                    `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${league.idLeague}&s=${selectedSeason}`
                );
                const data = await res.json();
                console.log("API Response:", data);
                setStandings(data.table || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setStandings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
    }, [league, selectedSeason]);

    return (
        <div>
            <h2>{league?.strLeague} - Stand</h2>

            <div className="season-selector">
                <label htmlFor="season-select"></label>
                <select
                    id="season-select"
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                >
                    {Array.from({length: 11}, (_, i) => {
                        const startYear = 2024 - i;
                        const endYear = startYear + 1;
                        const season = `${startYear}-${endYear}`;
                        return (
                            <option key={season} value={season}>
                                {season}
                            </option>
                        );
                    })}
                </select>

            </div>

            {loading ? (
                <p>Loading standings...</p>
            ) : standings.length > 0 ? (
                <table className="league-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>GW</th>
                        <th>P</th>
                    </tr>
                    </thead>
                    <tbody>
                    {standings.map((team) => (
                        <tr key={team.idTeam}>
                            <td>{team.intRank}</td>
                            <td>
                                <img
                                    src={team.strBadge}
                                    alt={team.strTeam}
                                    className="team-logo"
                                />
                                {team.strTeam}
                            </td>
                            <td>{team.intPlayed}</td>
                            <td>{team.intPoints}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="league-table-empty">No standings available for this season.</p>
            )}
        </div>
    );
}

export default LeagueTable;

