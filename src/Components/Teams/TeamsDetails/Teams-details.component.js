import React, { useState, useEffect } from 'react';
import "./Teams-details.component.css";
import UpcomingEvents from '../../Events/UpcomingEvents/Show-Events.component';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

function TeamsDetails() {
    const [team, setTeam] = useState({});
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const leagueId = searchParams.get('leagueId');

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${id}`);
                const data = await response.json();
                const teamData = data.teams[0];

                setTeam({
                    name: teamData.strTeam,
                    logo: teamData.strBadge,
                    id: teamData.idTeam,
                    desc: teamData.strDescriptionEN,
                    stadium: teamData.strStadium,
                    capStadium: teamData.intStadiumCapacity,
                    webp: teamData.strWebsite,
                    fb: teamData.strFacebook,
                    twit: teamData.strTwitter,
                    ig: teamData.strInstagram,
                });
            } catch (error) {
                console.error("Fout bij ophalen van teamgegevens:", error);
            }
        };

        const fetchEvents = async () => {
            try {
                const [nextRes, lastRes] = await Promise.all([
                    fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${id}`),
                    fetch(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${id}`)
                ]);
                const nextData = await nextRes.json();
                const lastData = await lastRes.json();

                console.log("Aankomende wedstrijden:", nextData);
                console.log("Afgelopen wedstrijden:", lastData);

                setUpcomingEvents(nextData.events || []);
                setPastEvents(lastData.results || []);
            } catch (error) {
                console.error("Fout bij ophalen van wedstrijden:", error);
            }
        };

        fetchTeam();
        fetchEvents();
    }, [id]);

    if (!team || !team.name) return <p>Loading...</p>;

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
                    <p>{"Capacity: " + team.capStadium}</p>
                </div>
                <p className="desc">{team.desc}</p>

                <div className="additionalInfo">
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe"></i></a>
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                </div>
                {leagueId && (
                    <div className="back-button-container">
                        <button
                            className="back-button"
                            onClick={() => navigate(`/teams?leagueId=${leagueId}`)}
                        >
                            ← Terug naar alle teams
                        </button>
                    </div>
                )}
            </div>

            <div className="rightBlock medium-scroll">
                <div className="tab-selector">
                    <button
                        className={activeTab === "upcoming" ? "active" : ""}
                        onClick={() => setActiveTab("upcoming")}
                    >
                        Aankomende wedstrijden
                    </button>
                    <button
                        className={activeTab === "past" ? "active" : ""}
                        onClick={() => setActiveTab("past")}
                    >
                        Afgelopen wedstrijden
                    </button>
                </div>

                {activeTab === "upcoming" && (
                    upcomingEvents.length > 0
                        ? <UpcomingEvents events={upcomingEvents} />
                        : <p>Geen aankomende wedstrijden gevonden.</p>
                )}

                {activeTab === "past" && (
                    pastEvents.length > 0
                        ? <UpcomingEvents events={pastEvents} />
                        : <p>Geen afgelopen wedstrijden gevonden.</p>
                )}
            </div>
        </div>
    );
}

export default TeamsDetails;



