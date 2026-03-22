import React, { useState, useEffect } from 'react';
import "./Teams-details.component.css";
import UpcomingEvents from '../../Events/UpcomingEvents/Show-Events.component';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TeamsDetails() {
    const [team, setTeam] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [error, setError] = useState(null);

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const leagueId = searchParams.get('leagueId');

    useEffect(() => {
        let isMounted = true;

        const fetchTeamData = async () => {
            try {
                setError(null);

                const teamRes = await axios.get(`/api/v1/json/3/lookupteam.php?id=${id}`);

                if (isMounted && teamRes.data.teams) {
                    const t = teamRes.data.teams[0];
                    setTeam({
                        name: t.strTeam,
                        logo: t.strBadge,
                        id: t.idTeam,
                        desc: t.strDescriptionEN,
                        stadium: t.strStadium,
                        capStadium: t.intStadiumCapacity,
                        webp: t.strWebsite,
                        fb: t.strFacebook,
                        twit: t.strTwitter,
                        ig: t.strInstagram,
                    });
                }

                await new Promise(resolve => setTimeout(resolve, 500));

                const nextRes = await axios.get(`/api/v1/json/3/eventsnext.php?id=${id}`);
                if (isMounted) setUpcomingEvents(nextRes.data.events || []);

                await new Promise(resolve => setTimeout(resolve, 500));

                const lastRes = await axios.get(`/api/v1/json/3/eventslast.php?id=${id}`);
                if (isMounted) setPastEvents(lastRes.data.results || []);

            } catch (err) {
                if (err.response && err.response.status === 429) {
                    setError("Te veel verzoeken, probeer het over een minuutje opnieuw.");
                } else {
                    setError("Er is iets misgegaan bij het ophalen van de gegevens.");
                }
            }
        };

        fetchTeamData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (error) return <div className="error-container"><p>{error}</p></div>;
    if (!team) return <div className="loading-container"><p>Laden...</p></div>;

    const websiteUrl = team.webp?.startsWith('http') ? team.webp : `https://${team.webp}`;
    const facebookUrl = team.fb?.startsWith('http') ? team.fb : `https://${team.fb}`;
    const twitterUrl = team.twit?.startsWith('http') ? team.twit : `https://${team.twit}`;
    const instagramUrl = team.ig?.startsWith('http') ? team.ig : `https://${team.ig}`;

    return (
        <div className="flexContainerOut">
            <div className="leftBlock">
                <div className="info">
                    <h2>{team.name}</h2>
                    <img src={team.logo} alt={team.name} width="100" />
                    <p>{team.stadium}</p>
                    <p>{"Capaciteit: " + team.capStadium}</p>
                </div>
                <p className="desc">{team.desc}</p>
                <div className="additionalInfo">
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">🌐</a>
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer">FB</a>
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer">TW</a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer">IG</a>
                </div>
                {leagueId && (
                    <div className="back-button-container">
                        <button className="back-button" onClick={() => navigate(`/teams?leagueId=${leagueId}`)}>
                            ← Terug naar alle teams
                        </button>
                    </div>
                )}
            </div>
            <div className="rightBlock medium-scroll">
                <div className="tab-selector">
                    <button className={activeTab === "upcoming" ? "active" : ""} onClick={() => setActiveTab("upcoming")}>Aankomende wedstrijden</button>
                    <button className={activeTab === "past" ? "active" : ""} onClick={() => setActiveTab("past")}>Afgelopen wedstrijden</button>
                </div>
                {activeTab === "upcoming" && (upcomingEvents.length > 0 ? <UpcomingEvents events={upcomingEvents} /> : <p>Geen aankomende wedstrijden gevonden.</p>)}
                {activeTab === "past" && (pastEvents.length > 0 ? <UpcomingEvents events={pastEvents} /> : <p>Geen afgelopen wedstrijden gevonden.</p>)}
            </div>
        </div>
    );
}

export default TeamsDetails;
