import React, { useState, useEffect } from 'react';
import "./Leagues-list.component.css";
import { useNavigate } from 'react-router-dom';

function TeamsList() {
    const [leagues, setLeagues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php?s=Soccer');
                const data = await response.json();


                setLeagues(data.leagues.filter(league => league.strSport === 'Soccer'));
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchLeagues();
    }, []);
    const navigateLeague = (leagueId) => {
        navigate(`/teams?leagueId=${leagueId}`);
    }
    return (
        <div className='league_wrapper'>
            {leagues.map((league, index) => (
                <div onClick={()=> navigateLeague(league.strLeague)} className="league_item" key={index}>
                    {league.strLeague}
                </div>
            ))}
        </div>
    );
}

export default TeamsList;
