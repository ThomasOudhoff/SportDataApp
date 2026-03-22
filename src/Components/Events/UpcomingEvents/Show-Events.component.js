import React from 'react';
import './Show-Events.component.css';

function UpcomingEvents({ events }) {
    if (!events || events.length === 0) {
        return (
            <article>
                <p>Geen aankomende wedstrijden gevonden.</p>
            </article>
        );
    }

    return (
        <section className="eventList">
            {events.map((event) => {
                const teams = event.strEvent.split(" vs ");
                const homeTeamName = teams[0];
                const awayTeamName = teams[1];

                return (
                    <article key={event.idEvent} className="eventContainer">
                        <header className="competitionRow">
                            <div className="competitionLeft">
                                {event.strLeagueBadge && (
                                    <img
                                        src={event.strLeagueBadge}
                                        alt=""
                                        className="leagueBadge"
                                    />
                                )}
                                <span>{event.strLeague}</span>
                            </div>
                            <time className="eventDate" dateTime={event.dateEvent}>
                                {new Date(event.dateEvent).toLocaleDateString('nl-NL')}
                            </time>
                        </header>

                        <div className="eventCard">
                            <div className="eventLeft">
                                <div className="teamRow">
                                    <img
                                        src={event.strHomeTeamBadge}
                                        alt=""
                                        className="teamLogo"
                                    />
                                    <span className="teamName">{homeTeamName}</span>
                                    {event.intHomeScore !== null && (
                                        <span className="teamScore">{event.intHomeScore}</span>
                                    )}
                                </div>
                                <div className="teamRow">
                                    <img
                                        src={event.strAwayTeamBadge}
                                        alt=""
                                        className="teamLogo"
                                    />
                                    <span className="teamName">{awayTeamName}</span>
                                    {event.intAwayScore !== null && (
                                        <span className="teamScore">{event.intAwayScore}</span>
                                    )}
                                </div>
                                <address className="stadium">{event.strVenue}</address>
                            </div>
                            <div className="eventRight">
                                <time className="eventTime">{event.strTime?.slice(0, 5)}</time>
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}

export default UpcomingEvents;

