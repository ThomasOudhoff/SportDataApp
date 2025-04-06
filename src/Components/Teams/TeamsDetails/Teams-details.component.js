import React, { useState, useEffect } from 'react';
import "./Teams-details.component.css";
import { useParams } from "react-router-dom";

function TeamsDetails() {
    const [team, setTeam] = useState({});
    const [eventInfo, setEventInfo] = useState([]);
    const { id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        const fetchTeam = async () => {
            try {
                // Haal teamgegevens op
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

                // Haal aankomende wedstrijden op
                const eventsResponse = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${id}`);
                const eventsData = await eventsResponse.json();
                if (eventsData.events) {
                    const filtered = eventsData.events.map(event => ({
                        id: event.idEvent,
                        name: event.strEvent,
                        homeBadge: event.strHomeTeamBadge,
                        awayBadge: event.strAwayTeamBadge,
                        date: event.dateEvent,
                        time: event.strTime,
                        venue: event.strVenue,
                        league: event.strLeague,
                        leagueBadge: event.strLeagueBadge
                    }));
                    setEventInfo(filtered);
                }
            } catch (error) {
                console.error("Error fetching team or events:", error);
            }
        };


        fetchTeam();
    }, [id]);

    if (!team || !team.name) {
        return <p>Loading...</p>;
    }

    const websiteUrl = team.webp?.startsWith('http') ? team.webp : `https://${team.webp}`;
    const facebookUrl = team.fb?.startsWith('http') ? team.fb : `https://${team.fb}`;
    const twitterUrl = team.twit?.startsWith('http') ? team.twit : `https://${team.twit}`;
    const instagramUrl = team.ig?.startsWith('http') ? team.ig : `https://${team.ig}`;

    return (
        <div className="flexContainerOut">
            {/* Linkerblok met teaminfo */}
            <div className="leftBlock">
                <div className="info">
                    <div className="teamHeader">
                        <h2>{team.name}</h2>
                        <i
                            className={`fas fa-star favoriteStar ${isFavorite ? 'active' : ''}`}
                            onClick={() => setIsFavorite(!isFavorite)}
                            title={isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
                        ></i>
                    </div>
                    <img src={team.logo} alt={team.name} width="100"/>
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
            </div>

            {/* Rechterblok met wedstrijden */}
            <div className="rightBlock">
                <h5>Aankomende wedstrijden</h5>
                {eventInfo.length > 0 ? (
                    <div className="eventList">
                        {eventInfo.map((event) => {
                            const [homeTeamName, awayTeamName] = event.name.split(" vs ");

                            return (
                                <div key={event.id} className="eventCard">
                                    <div className="eventLeft">
                                        <div className="competitionRow">
                                            <div className="competitionLeft">
                                                <img src={event.leagueBadge} alt="League badge"
                                                     className="leagueBadge"/>
                                                <span>{event.league}</span>
                                            </div>
                                            <span className="eventDate">
                                             {new Date(event.date).toLocaleDateString('nl-NL')}
                                            </span>
                                        </div>

                                        <div className="teamRow">
                                            <img src={event.homeBadge} alt="Home Team Badge" className="teamLogo"/>
                                            <span className="teamName">{homeTeamName}</span>
                                        </div>

                                        <div className="teamRow">
                                            <img src={event.awayBadge} alt="Away Team Badge" className="teamLogo"/>
                                            <span className="teamName">{awayTeamName}</span>
                                        </div>

                                        <p className="stadium">{event.venue}</p>
                                    </div>

                                    <div className="eventRight">
                                        <p className="eventTime">
                                            {event.time.slice(0, 5)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No upcoming events found.</p>
                )}
            </div>
        </div>
    );
}

export default TeamsDetails;
