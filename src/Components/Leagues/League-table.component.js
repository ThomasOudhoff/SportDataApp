import React, { useEffect, useState } from 'react';
import './League-table.component.css';
import UpcomingEvents from '../Events/UpcomingEvents/Show-Events.component';
import { useNavigate } from 'react-router-dom';
import SeasonSelector from "../ComponentHelpers/SeasonSelect/SeasonSelect.component";

function LeagueTable({ league }) {
    const currentYear = new Date().getFullYear();
    const latestSeason = `${currentYear - 1}-${currentYear}`;

    // Geselecteerd seizoen
    const [selectedSeason, setSelectedSeason] = useState(latestSeason);

    // Ranglijstgegevens van het geselecteerde seizoen
    const [standings, setStandings] = useState([]);

    // Aankomende wedstrijden
    const [events, setEvents] = useState([]);

    // Laadstatus (true tijdens API-oproepen)
    const [loading, setLoading] = useState(false);

    // Actieve tab: 'stand' of 'events'
    const [activeTab, setActiveTab] = useState("stand");

    const navigate = useNavigate();

    // Ophalen van ranglijst bij wijziging van competitie, seizoen of tab
    useEffect(() => {
        if (activeTab !== "stand" || !league?.idLeague) return;

        const fetchTable = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${league.idLeague}&s=${selectedSeason}`
                );
                const data = await res.json();
                setStandings(data.table || []);
            } catch (error) {
                console.error("Fout bij ophalen van ranglijst:", error);
                setStandings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
    }, [league, selectedSeason, activeTab]);

    // Ophalen van aankomende wedstrijden bij wijziging van competitie of tab
    useEffect(() => {
        if (activeTab !== "events" || !league?.idLeague) return;

        const fetchEvents = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${league.idLeague}`
                );
                const data = await res.json();
                setEvents(data.events || []);
            } catch (error) {
                console.error("Fout bij ophalen van evenementen:", error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [league, activeTab]);

    console.log('Aantal teams:', standings.length); //tijdens inleveren waren dit er nog meer, maar de API is veranderd.
    return (
        <div>
            {/* Tabs */}
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

            {/* STAND-tab */}
            {activeTab === "stand" && (
                <>
                    {/* Seizoenselectie + knop */}
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

                    {/* Stand of melding */}
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

            {/* EVENTS-tab */}
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
