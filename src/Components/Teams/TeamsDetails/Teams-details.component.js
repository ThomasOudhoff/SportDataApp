import React, { useState, useEffect } from 'react';
import "./Teams-details.component.css";
import UpcomingEvents from '../../Events/UpcomingEvents/Show-Events.component';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";


function TeamsDetails() {
    // Teamgegevens
    const [team, setTeam] = useState({});

    // Lijst van aankomende en afgelopen wedstrijden
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    // Huidige actieve tab ('upcoming' of 'past')
    const [activeTab, setActiveTab] = useState("upcoming");

    // Haal het team-ID uit de URL via react-router
    const { id } = useParams();

    // Haal teamdetails + wedstrijden op zodra component laadt of het ID verandert
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const leagueId = searchParams.get('leagueId');
    console.log("leagueId:", leagueId);

    useEffect(() => {
        // Haal gegevens van het geselecteerde team op
        const fetchTeam = async () => {
            try {
                const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${id}`);
                const data = await response.json();
                const teamData = data.teams[0];

                // Sla relevante teamgegevens op in state
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

        // Haal aankomende en afgelopen wedstrijden tegelijk op
        const fetchEvents = async () => {
            try {
                const [nextRes, lastRes] = await Promise.all([
                    fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${id}`),
                    fetch(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${id}`)
                ]);
                const nextData = await nextRes.json();
                const lastData = await lastRes.json();

                // Sla wedstrijden op in state
                setUpcomingEvents(nextData.events || []);
                setPastEvents(lastData.results || []);
            } catch (error) {
                console.error("Fout bij ophalen van wedstrijden:", error);
            }
        };

        fetchTeam();
        fetchEvents();
    }, [id]);

    // Toon tijdelijk een loading-state totdat teamgegevens beschikbaar zijn
    if (!team || !team.name) return <p>Loading...</p>;

    // Voeg 'https://' toe aan social media links indien nodig
    const websiteUrl = team.webp?.startsWith('http') ? team.webp : `https://${team.webp}`;
    const facebookUrl = team.fb?.startsWith('http') ? team.fb : `https://${team.fb}`;
    const twitterUrl = team.twit?.startsWith('http') ? team.twit : `https://${team.twit}`;
    const instagramUrl = team.ig?.startsWith('http') ? team.ig : `https://${team.ig}`;

    return (
        <div className="flexContainerOut">
            {/* Linkerzijde met teaminformatie */}
            <div className="leftBlock">
                <div className="info">
                    <h2>{team.name}</h2>
                    <img src={team.logo} alt={team.name} width="100" />
                    <p>{team.stadium}</p>
                    <p>{"Capacity: " + team.capStadium}</p>
                </div>
                <p className="desc">{team.desc}</p>

                {/* Social media iconen */}
                <div className="additionalInfo">
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe"></i></a>
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                </div>
                {/* Conditieel tonen van de knop */}
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

            {/* Rechterzijde met wedstrijden */}
            <div className="rightBlock medium-scroll">
                {/* Tabs om te wisselen tussen aankomende en afgelopen wedstrijden */}
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

                {/* Inhoud van de geselecteerde tab */}
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



