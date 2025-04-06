import React from 'react';
import './Upcoming-Events.component.css';

function UpcomingEvents({ events }) {
    if (!events || events.length === 0) {
        return <p>Geen aankomende wedstrijden gevonden.</p>;
    }

    return (
        <div className="eventList">
            {events.map((event) => {
                const [homeTeamName, awayTeamName] = event.strEvent.split(" vs ");
                return (
                    <div key={event.idEvent}>
                        <div className="competitionRow">
                            <div className="competitionLeft">
                                {event.strLeagueBadge && (
                                    <img
                                        src={event.strLeagueBadge}
                                        alt="League badge"
                                        className="leagueBadge"
                                    />
                                )}
                                <span>{event.strLeague}</span>
                            </div>
                            <span className="eventDate">
                                {new Date(event.dateEvent).toLocaleDateString('nl-NL')}
                            </span>
                        </div>

                        <div className="eventCard">
                            <div className="eventLeft">
                                <div className="teamRow">
                                    <img src={event.strHomeTeamBadge} alt="Home Team Badge" className="teamLogo" />
                                    <span className="teamName">{homeTeamName}</span>
                                </div>
                                <div className="teamRow">
                                    <img src={event.strAwayTeamBadge} alt="Away Team Badge" className="teamLogo" />
                                    <span className="teamName">{awayTeamName}</span>
                                </div>
                                <p className="stadium">{event.strVenue}</p>
                            </div>
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
