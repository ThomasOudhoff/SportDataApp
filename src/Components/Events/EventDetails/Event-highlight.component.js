import React, { useState, useEffect } from 'react';
import "./Event-highlight.component.css";
import { useNavigate } from 'react-router-dom';


function EventHighlight() {
    const [event, setEvent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=Arsenal_vs_Chelsea');
                const data = await response.json();


                setEvent(data.event[0]);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchEvent();
    }, []);
    const navigateEvent = (eventId) => {
        navigate(`/event?eventId=${eventId}`);
    }
    return (
        <div className='event_wrapper'>
            <div className='grid-eventhighlight'>
                <div className="content">
                    <div className="leagueBadge text-center mb-3">
                        <img src={event.strLeagueBadge} className='small-picture'/>
                    </div>
                    <div className='event-title mt-5 text-center'>
                        <img src={event.strHomeTeamBadge} className='icon me-5'/>
                        {event.strEvent}
                        <img src={event.strAwayTeamBadge} className='icon ms-5'/>
                    </div>
                    <div className='event-subtitle text-center'>{event.strVenue}</div>
                    <div className='event-subtitle text-center small-text'>{event.dateEvent}</div>
                    <div className='event-subtitle text-center small-text'>{event.strTime}</div>
                </div>
            </div>
        </div>

    );
}

export default EventHighlight;
