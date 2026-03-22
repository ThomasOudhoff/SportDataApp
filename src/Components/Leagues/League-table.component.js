import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './League-table.component.css';
import UpcomingEvents from '../Events/UpcomingEvents/Show-Events.component';
import { useNavigate } from 'react-router-dom';
import SeasonSelector from "../ComponentHelpers/SeasonSelect/SeasonSelect.component";

function LeagueTable({ league }) {
    const currentYear = new Date().getFullYear();
    const latestSeason = `${currentYear - 1}-${currentYear}`;
    const [selectedSeason, setSelectedSeason] = useState(latestSeason);
    const [standings, setStandings] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("stand");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTable = async () => {
            if (activeTab !== "stand" || !league?.idLeague) return;
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${league.idLeague}&s=${selectedSeason}`
                );
                setStandings(response.data.table || []);
            } catch (err) {
                setError("Kon de stand niet ophalen.");
                setStandings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
    }, [league?.idLeague, selectedSeason, activeTab]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (activeTab !== "events" || !league?.idLeague) return;
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${league.idLeague}`
                );
                setEvents(response.data.events || []);
            } catch (err) {
                setError("Kon de evenementen niet ophalen.");
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [league?.idLeague, activeTab]);

    return (
        <section>
            <nav className="tab-selector">
                <button
                    type="button"
                    className={activeTab === "stand" ? "active" : ""}
                    onClick={() => setActiveTab("stand")}
                >
                    Stand
                </button>
                <button
                    type="button"
                    className={activeTab === "events" ? "active" : ""}
                    onClick={() => setActiveTab("events")}
                >
                    Volgende wedstrijden
                </button>
            </nav>

            {error && <p className="error-message">{error}</p>}

            {activeTab === "stand" && (
                <article>
                    <header className="season-bar">
                        <SeasonSelector
                            value={selectedSeason}
                            onChange={setSelectedSeason}
                            yearsBack={10}
                        />
                        <button
                            type="button"
                            className="view-teams-button"
                            onClick={() => navigate(`/teams?leagueId=${league.idLeague}`)}
                        >
                            Bekijk alle teams
                        </button>
                    </header>

                    {loading ? (
                        <p>Stand wordt geladen...</p>
                    ) : standings.length > 0 ? (
                        <table className="league-table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Team</th>
                                <th scope="col">GW</th>
                                <th scope="col">P</th>
                            </tr>
                            </thead>
                            <tbody>
                            {standings.map((team) => (
                                <tr key={team.idTeam}>
                                    <td>{team.intRank}</td>
                                    <td>
                                        <div className="team-cell">
                                            <img
                                                src={team.strBadge}
                                                alt=""
                                                className="team-logo"
                                            />
                                            <span>{team.strTeam}</span>
                                        </div>
                                    </td>
                                    <td>{team.intPlayed}</td>
                                    <td>{team.intPoints}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Geen stand beschikbaar voor dit seizoen.</p>
                    )}
                </article>
            )}

            {activeTab === "events" && (
                <article>
                    {loading ? (
                        <p>Evenementen worden geladen...</p>
                    ) : (
                        <UpcomingEvents events={events} />
                    )}
                </article>
            )}
        </section>
    );
}

export default LeagueTable;