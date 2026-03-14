import React, { useEffect, useState } from 'react';
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
    const [activeTab, setActiveTab] = useState("stand");

    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab !== "stand" || !league?.idLeague) return;

        const fetchTable = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/v1/json/3/lookuptable.php?l=${league.idLeague}&s=${selectedSeason}`
                );
                const data = await res.json();
                setStandings(data.table || []);
            } catch (error) {
                console.error(error);
                setStandings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
    }, [league, selectedSeason, activeTab]);

    useEffect(() => {
        if (activeTab !== "events" || !league?.idLeague) return;

        const fetchEvents = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/v1/json/3/eventsnextleague.php?id=${league.idLeague}`
                );
                const data = await res.json();
                setEvents(data.events || []);
            } catch (error) {
                console.error(error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [league, activeTab]);

    return (
        <div>
            <div className="tab-selector">
                <button
                    className={activeTab === "stand" ? "active" : ""}
                    onClick={() => setActiveTab("stand")}
                >
                    Stand
                </button>
                <button
                    className={activeTab === "events" ? "active" : ""}
                    onClick={() => setActiveTab("events")}
                >
                    Volgende wedstrijden
                </button>
            </div>
            {activeTab === "stand" && (
                <>
                    <div className="season-bar">
                        <SeasonSelector
                            value={selectedSeason}
                            onChange={setSelectedSeason}
                            yearsBack={10}
                        />

                        <button
                            className="view-teams-button"
                            onClick={() => navigate(`/teams?leagueId=${league.idLeague}`)}
                        >
                            Bekijk alle teams
                        </button>
                    </div>
                    {loading ? (
                        <p>Stand wordt geladen...</p>
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
                        <p>Geen stand beschikbaar voor dit seizoen.</p>
                    )}
                </>
            )}
            {activeTab === "events" && (
                <>
                    {loading ? (
                        <p>Evenementen worden geladen...</p>
                    ) : (
                        <UpcomingEvents events={events}/>
                    )}
                </>
            )}
        </div>
    );
}
export default LeagueTable;
