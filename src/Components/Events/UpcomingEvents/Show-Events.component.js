import React from 'react';
import './Show-Events.component.css';

function UpcomingEvents({ events }) {
    // Als er geen evenementen zijn, toon een melding
    if (!events || events.length === 0) {
        return <p>Geen aankomende wedstrijden gevonden.</p>;
    }

    return (
        // Hier worden de aankomende wedstrijden weergegeven
        <div className="eventList">
            {/* Doorloop alle evenementen */}
            {events.map((event) => {
                // Haal thuis- en uitteamnaam uit de eventtitel (gescheiden door " vs ")
                const [homeTeamName, awayTeamName] = event.strEvent.split(" vs ");

                return (
                    <div key={event.idEvent}>
                        {/* Competitienaam + datum */}
                        <div className="competitionRow">
                            <div className="competitionLeft">
                                {/* Toon competitie-logo als beschikbaar */}
                                {event.strLeagueBadge && (
                                    <img
                                        src={event.strLeagueBadge}
                                        alt="League badge"
                                        className="leagueBadge"
                                    />
                                )}
                                <span>{event.strLeague}</span>
                            </div>

                            {/* Datum van de wedstrijd */}
                            <span className="eventDate me-2">
                                {new Date(event.dateEvent).toLocaleDateString('nl-NL')}
                            </span>
                        </div>

                        {/* Wedstrijdkaart */}
                        <div className="eventCard">
                            <div className="eventLeft">
                                {/* Thuisteam */}
                                <div className="teamRow">
                                    <img
                                        src={event.strHomeTeamBadge}
                                        alt="Home Team Badge"
                                        className="teamLogo"
                                    />
                                    <span className="teamName text-start">{homeTeamName}</span>
                                    {/* Toon score als beschikbaar */}
                                    {event.intHomeScore !== null && (
                                        <span className="teamScore">{event.intHomeScore}</span>
                                    )}
                                </div>

                                {/* Uitteam */}
                                <div className="teamRow">
                                    <img
                                        src={event.strAwayTeamBadge}
                                        alt="Away Team Badge"
                                        className="teamLogo"
                                    />
                                    <span className="teamName text-start">{awayTeamName}</span>
                                    {/* Toon score als beschikbaar */}
                                    {event.intAwayScore !== null && (
                                        <span className="teamScore">{event.intAwayScore}</span>
                                    )}
                                </div>

                                {/* Stadionnaam */}
                                <p className="stadium text-start">{event.strVenue}</p>
                            </div>

                            {/* Rechterzijde: tijdstip */}
                            <div className="eventRight">
                                <p className="eventTime">{event.strTime?.slice(0, 5)}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default UpcomingEvents;

